
# Einkaufsplaner (Meal & Shopping Planner)

**Team-2**  
**Members:**  
Hristo Baldzhiyski, Anastasiia Sariohlo , Stefan

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

- **Mobile-Friendly Design**  
  Optimized for use on mobile devices as well as desktop.

- **Reverse Search**  
  Find recipes based on available ingredients.

- **Online Import from Chefkoch**  
  Import recipes directly from Chefkoch to save time.

- **Multi-Tenancy Support**  
  Suitable for multi-user environments.

- **Share Recipes**  
  Share recipes easily with others.

---

## Security Features
- **User Authentication**  
  Secure user login and registration processes using Spring Security.

- **Role-Based Authorization**  
  Differentiate access levels based on user roles, ensuring that users can only access their data.


## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/einkaufsplaner.git
   cd einkaufsplaner
   ```

2. **Build and Start the Docker containers**:
   Before starting the project, you need to build the Docker containers. Run the following command in your terminal:
   ```bash
   docker-compose up --build
   ```
   This command will set up the database and the Caddy server as specified in the `docker-compose.yml` file.

3. **Understanding the Caddyfile**:
   The `Caddyfile` is configured to manage how incoming requests are routed. It specifies the rules for directing traffic to your application. Ensure you have the correct configuration to handle the requests your application will receive.

4. **Access the Application**:
   Once the containers are running, you can access the application through your web browser at `http://localhost:8080`.

