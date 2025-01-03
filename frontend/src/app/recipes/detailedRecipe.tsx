import { Modal, Button, ModalBody, ModalFooter, ModalHeader, ModalContent } from "@nextui-org/react";
import { Recipe } from "@entities/Recipe";
import { useState, useEffect } from "react";
import { FaClock, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import apiClient from "@lib/apiClient";

interface RecipeDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
  onRatingUpdate: (newRating: number) => void;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ isOpen, onClose, recipe, onRatingUpdate }) => {
  const [portions, setPortions] = useState(1);
  const [scaledIngredients, setScaledIngredients] = useState(recipe.recipeIngredients);
  const [rating, setRating] = useState<number>(recipe.averageRating || 0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const response = await apiClient.get(`recipes/${recipe.id}/rating`);
        setUserRating(response ?? null);
      } catch (error) {
        console.error("Error fetching user rating:", error);
      }
    };

    if (recipe?.id) {
      fetchUserRating();
    }
  }, [recipe.id]);

  const handleRatingClick = async (rate: number) => {
    setRating(rate);
    await apiClient.post(`recipes/${recipe.id}/rate`, {
      numStars: rate,
      recipeId: recipe.id,
    });
    toast.success("Successfully rated recipe!");
    onRatingUpdate(rate);
    setUserRating(rate); // Update the user rating
  };

  const handleMouseEnter = (rate: number) => setHoverRating(rate);
  const handleMouseLeave = () => setHoverRating(0);

  const scaleIngredients = (ingredients: any[], portions: number) => {
    return ingredients.map((ingredient) => ({
      ...ingredient,
      amount: ingredient.amount * portions,
    }));
  };

  useEffect(() => {
    if (recipe.recipeIngredients) {
      setScaledIngredients(scaleIngredients(recipe.recipeIngredients, portions));
    }
  }, [recipe, portions]);

  const increasePortions = () => setPortions((prev) => prev + 1);
  const decreasePortions = () => setPortions((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Modal isOpen={isOpen} placement="center" onClose={onClose} isDismissable className="flex items-center justify-center">
      <ModalContent
        className="bg-white p-6 rounded-lg shadow-xl max-w-5xl w-full relative z-10"
        style={{
          backgroundImage: `url(${recipe.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%)",
          color: "white",
        }}
      >
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black opacity-50 rounded-lg"
          style={{ zIndex: -1 }}
        />
        {/* Modal Content */}
        <div className="relative z-20">
          <ModalHeader className="border-b pb-3 mb-4">
            <h2 className="text-3xl font-semibold">{recipe.recipeName}</h2>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-6">
              {/* Left Section */}
              <div>
                <p className="text-gray-200 mb-4">{recipe.description}</p>
                <div className="text-sm space-y-2">
                  <p className="text-white">
                    <strong>Meal Type:</strong> {recipe.mealType}
                  </p>
                  <p className="text-white">
                    <strong>Dish Type:</strong> {recipe.dishType}
                  </p>
                  <p className="text-white">
                    <strong>Dietary Preference:</strong> {recipe.dietaryPreference}
                  </p>
                  <p className="text-white">
                    <strong>Created by:</strong> {recipe.creatorUsername}
                  </p>
                </div>

                {/* Estimated Time */}
                <div className="flex items-center space-x-2 mt-4">
                  <FaClock className="text-white" />
                  <span className="text-white text-sm">
                    Estimated Time: {recipe.estimatedTime} minutes
                  </span>
                </div>

                {/* Rating Section */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Rate this Recipe:</h4>
                  <div className="flex space-x-2" style={{ zIndex: 10 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={24}
                        color={
                          (userRating && userRating >= star) || hoverRating >= star
                            ? "#FFD700" // Yellow for rated or hover
                            : "#D3D3D3" // Gray for not rated or hover
                        }
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        className="cursor-pointer"
                        style={{
                          zIndex: 10, // Ensures stars are clickable above background
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div>
                {/* Ingredients List */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Ingredients:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-white">
                    {scaledIngredients?.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.amount} {ingredient.unit} of {ingredient.ingredientName}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Portion Control */}
                <div className="mt-6 flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-white">
                    Portions: {portions}
                  </h4>
                  <div className="flex space-x-2">
                    <Button
                      onClick={decreasePortions}
                      disabled={portions <= 1}
                      size="sm"
                    >
                      -
                    </Button>
                    <Button onClick={increasePortions} size="sm">
                      +
                    </Button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Instructions:</h4>
                  <p className="text-sm text-white">{recipe.instructions}</p>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="pt-4">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition"
              onClick={onClose}
              size="sm"
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default RecipeDetails;
