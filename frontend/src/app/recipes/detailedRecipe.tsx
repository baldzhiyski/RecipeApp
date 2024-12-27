import { Modal, Button, ModalBody, ModalFooter, ModalHeader, ModalContent } from '@nextui-org/react';
import { Recipe } from '@entities/Recipe';
import { useState, useEffect } from 'react';
import { FaClock, FaStar } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import apiClient from '@lib/apiClient'; // Importing the clock icon

interface RecipeDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
  onRatingUpdate: (newRating: number) => void; // Callback to update rating in the parent
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
                                                       isOpen,
                                                       onClose,
                                                       recipe,
                                                       onRatingUpdate
                                                     }) => {
  const [portions, setPortions] = useState(1); // Default portion size
  const [scaledIngredients, setScaledIngredients] = useState(recipe.recipeIngredients);

  const [rating, setRating] = useState<number>(recipe.averageRating || 0); // Rating state (default to recipe's average rating)
  const [hoverRating, setHoverRating] = useState<number>(0); // Hover rating for star highlight
  const [userRating, setUserRating] = useState<number | null>(null); // Store user rating

  // Fetch the user's rating when the component mounts
  // Fetch the user's rating when the component mounts
  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const response = await apiClient.get(`recipes/${recipe.id}/rating`);
        console.log('Fetched user rating:', response);

        // If no rating exists, response.data will be null, otherwise, store the rating
        setUserRating(response ?? null); // If null, user hasn't rated yet
      } catch (error) {
        console.error('Error fetching user rating:', error);
      }
    };

    // Call the fetch function only when recipe.id is available
    if (recipe?.id) {
      fetchUserRating();
    }
  }, [recipe.id]);

  // Handle rating star click
  const handleRatingClick = async (rate: number) => {
    setRating(rate);
    // Use ApiClient to send POST request with the updated rating
    console.log(rate)

    // Log the payload to see what you're sending
    const payload = {

    };

    console.log(payload);

    await apiClient.post(`recipes/${recipe.id}/rate`, { numStars: rate,
        recipeId: recipe.id });
    toast.success('Successfully rated recipe !');

    // Update parent component's state
    onRatingUpdate(rate);

  };

  // Handle mouse hover on stars for preview effect
  const handleMouseEnter = (rate: number) => setHoverRating(rate);
  const handleMouseLeave = () => setHoverRating(0);


  // Function to scale the ingredient quantities
  const scaleIngredients = (ingredients: any[], portions: number) => {
    return ingredients.map((ingredient) => ({
      ...ingredient,
      amount: ingredient.amount * portions, // Multiply amount by the number of portions
    }));
  };

  // Update scaled ingredients whenever recipe or portions change
  useEffect(() => {
    if (recipe.recipeIngredients) {
      setScaledIngredients(scaleIngredients(recipe.recipeIngredients, portions));
    }
  }, [recipe, portions]);

  // Handle increment and decrement for portions
  const increasePortions = () => setPortions((prev) => prev + 1);
  const decreasePortions = () => setPortions((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onClose={onClose}
      isDismissable
      className="flex items-center justify-center"
    >
      <ModalContent className="bg-blue-100 p-1 rounded-lg shadow-xl max-w-xl w-full">
        <ModalHeader className="border-b pb-1 mb-1">
          <h2 className="text-2xl font-semibold text-gray-800">{recipe.recipeName}</h2>
        </ModalHeader>

        <ModalBody className="space-y-1 text-gray-700">
          {/* Description and Details */}
          <p className="text-base">{recipe.description}</p>

          <div className="text-sm space-y-1">
            <p>
              <span className="font-semibold">Meal Type:</span> {recipe.mealType}
            </p>
            <p>
              <span className="font-semibold">Dish Type:</span> {recipe.dishType}
            </p>
            <p>
              <span className="font-semibold">Dietary Preference:</span> {recipe.dietaryPreference}
            </p>
            <p>
              <span className="font-semibold">Created by:</span> {recipe.creatorUsername}
            </p>
          </div>

          {/* Estimated Time with Clock Icon */}
          <div className="flex items-center space-x-1 mt-1">
            <FaClock className="text-gray-500" />
            <span className="text-sm">
              Estimated Time: {recipe.estimatedTime} minutes
            </span>
          </div>

          {/* Ingredients List */}
          <div className="mt-1">
            <h4 className="text-lg font-semibold">Ingredients:</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {scaledIngredients?.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount} {ingredient.unit} of {ingredient.ingredientName}
                </li>
              ))}
            </ul>
          </div>

          {/* Portion Control */}
          <div className="mt-1 flex justify-between items-center">
            <h4 className="text-sm font-semibold">Portions: {portions}</h4>
            <div className="flex space-x-1">
              <Button onClick={decreasePortions} disabled={portions <= 1} size="sm">
                -
              </Button>
              <Button onClick={increasePortions} size="sm">+</Button>
            </div>
          </div>

          {/* Rating Section with Stars */}
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Rate this Recipe:</h4>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  color={userRating >= star ? "#FFD700" : hoverRating >= star ? "#FFD700" : "#D3D3D3"} // Stars are golden if rated by user or hovered over, else gray
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => handleMouseEnter(star)}
                  onMouseLeave={handleMouseLeave}
                  className="cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-1">
            <h4 className="text-lg font-semibold">Instructions:</h4>
            <p className="text-sm">{recipe.instructions}</p>
          </div>
        </ModalBody>

        <ModalFooter className="pt-1">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition"
            onClick={onClose}
            size="sm"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RecipeDetails;
