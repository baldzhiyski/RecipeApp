# Einkaufsplaner (Meal & Shopping Planner)

**Team-2**  
**Members:**  
Hristo Baldzhiyski - st187553@stud.unistuttgart.de

Anastasiia Sariohlo - st188570@stud.uni-stuttgart.de 

Stefan Moser - st195741@stud.uni-stuttgart.de

## Overview
Einkaufsplaner is a comprehensive meal and shopping planner that simplifies recipe management, meal planning, and grocery list generation. The application is designed to streamline weekly meal prep, shopping, and cooking efficiency, with an array of critical and optional features.

## Critical Features
- **Add Recipes with Ingredients and Quantities**  
  Save recipes with all necessary details for easy access and future reference.

- **Create Weekly Meal Plan**  
  Plan meals for each day of the week and track ingredients accordingly.

- **Generate Shopping List**  
  Automatically generate a shopping list that combines duplicate ingredients and organizes quantities.

- **Adjust Serving Sizes**  
  Scale ingredient amounts based on the desired number of servings.

- **Search Recipes with Filters**  
  Search for recipes using various filters to find the right dish.

- **Cooking Statistics**  
  Track your cooking history and patterns to optimize meal planning.

## Additional Features (Optional)
- **Mark Favorites**  
  Save frequently used recipes for quick access.

- **Ingredient Highlighting and Sorting**  
  Organize ingredients by type and use color coding for easy identification.

- **Mark Perishable Ingredients**  
  Identify ingredients that spoil quickly to use them sooner.

- **Mark Available Ingredients**  
  Check off ingredients you already have to avoid duplicate purchases.

- **Suggestion Feature**  
  Get recipe recommendations based on available ingredients.

- **Display Recipe Effort Level**  
  Show the time and difficulty required for each recipe.

- **Reverse Search**  
  Find recipes based on available ingredients.

---

## Security Features
- **User Authentication**  
  Secure user login and registration processes using Spring Security.

- **Role-Based Authorization**  
  Differentiate access levels based on user roles, ensuring that users can only access their data.

## Technologies Used
- **Frontend**: Built with Next.js, providing a responsive and modern user interface.
- **Backend**: Developed using Spring Boot, organized with a two-layer architecture (Controller and Service layers) for a clean and maintainable codebase.

## Getting Started ( Locally )

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/einkaufsplaner.git](https://github.tik.uni-stuttgart.de/iste-sopra-2024-aeb/team-2.git
   ```
## 2. Build and Start the Docker Containers

Get your own cloudinary credentials  : Make sure you have a [Cloudinary](https://cloudinary.com/) account. Follow these steps:

1. **Register on Cloudinary**: Sign up for a Cloudinary account if you don’t have one already.
2. **Create an API Key**: In your Cloudinary dashboard, create an API key to use for this project.
3. **Set Cloudinary Credentials**: Add the following environment variables with your Cloudinary details or use the provided ones:

    - `CLOUDINARY_NAME`
    - `CLOUDINARY_API_KEY`
    - `CLOUDINARY_API_SECRET`

Once your Cloudinary setup is complete, you’re ready to start the app. Make sure to have a running MariaDB database.
Run the following command so u make sure u have the db :
```bash
docker-compose up --build
   ```
   This command will set up the database and the api server as specified in the `docker-compose.yml` file.

Then you need to go to the frontend folder and make a change in the .env.local file. Replace it with the url in the .env.local.example.
Then write the following commands : 
```bash
npm install
npm run dev
   ```

3.**Locally Testing**:

Once the containers are running and the frontend is started:

URL: http://localhost:3000
