import { Modal, Button, ModalBody, ModalFooter, ModalHeader, ModalContent } from "@nextui-org/react";
import { Recipe } from "@entities/Recipe";
import { useState, useEffect } from "react";
import { FaClock, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import apiClient from "@lib/apiClient";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';


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

  const generatePDF = () => {
    const doc = new jsPDF();

    // Set Title
    doc.setFontSize(18);
    doc.text(recipe.recipeName, 20, 20);

    // Add Image (if available)
    if (recipe.imageUrl) {
      doc.addImage(recipe.imageUrl, 'JPEG', 15, 30, 180, 100); // Adjust image position and size
    }

    // Add Description with better formatting
    doc.setFontSize(12);
    doc.setTextColor(50);  // Set text color
    doc.text(recipe.description, 20, 140, { maxWidth: 180 });

    // Add a horizontal line separator after the description
    doc.setLineWidth(0.5);
    doc.line(20, 150, 190, 150);

    // Add Ingredients section using a table
    doc.setFontSize(12);
    doc.setTextColor(0);  // Reset text color for ingredients
    doc.text('Ingredients:', 20, 160);

    // AutoTable for Ingredients List
    const startY = 170;
    doc.autoTable({
      startY: startY,
      head: [['Ingredient', 'Amount', 'Unit']],  // Column headers
      body: scaledIngredients.map((ingredient) => [
        ingredient.ingredientName,
        ingredient.amount.toFixed(1),  // Format amount for consistency
        ingredient.unit
      ]),
      theme: 'striped',  // Striped rows for better readability
      headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] }, // Header background and text color
      bodyStyles: { fontSize: 12 },
      columnStyles: { 0: { cellWidth: 70 }, 1: { cellWidth: 30 }, 2: { cellWidth: 80 } }, // Column width adjustment
      margin: { top: 10, left: 20, right: 20 },
    });

    // Add Instructions Section
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text('Instructions:', 20, doc.lastAutoTable.finalY + 10);  // Positioned after the table
    doc.text(recipe.instructions, 20, doc.lastAutoTable.finalY + 20, { maxWidth: 180 });

    // Save PDF
    doc.save(`${recipe.recipeName}.pdf`);
  };

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
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg" style={{ zIndex: -1 }} />

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
                        color={userRating && userRating >= star || hoverRating >= star ? "#FFD700" : "#D3D3D3"}
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        className="cursor-pointer"
                        style={{ zIndex: 10 }}
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
                  <h4 className="text-sm font-semibold text-white">Portions: {portions}</h4>
                  <div className="flex space-x-2">
                    <Button onClick={decreasePortions} disabled={portions <= 1} size="sm">-</Button>
                    <Button onClick={increasePortions} size="sm">+</Button>
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
            <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition" onClick={onClose} size="sm">Close</Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition" onClick={generatePDF} size="sm">Download PDF</Button>
          </ModalFooter>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default RecipeDetails;
