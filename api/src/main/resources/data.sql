  -- Zutaten einfügen
INSERT INTO ingredients (id, name) VALUES
                                       (1, 'Spaghetti'),
                                       (2, 'Ground Beef'),
                                       (3, 'Tomato Sauce'),
                                       (4, 'Onion'),
                                       (5, 'Garlic'),
                                       (6, 'Olive Oil'),
                                       (7, 'Salt'),
                                       (8, 'Black Pepper'),
                                       (9, 'Chicken Breast'),
                                       (10, 'Mixed Greens'),
                                       (11, 'Cherry Tomatoes'),
                                       (12, 'Cucumber'),
                                       (13, 'Lemon Juice'),
                                       (14, 'Bell Pepper'),
                                       (15, 'Carrot'),
                                       (16, 'Broccoli'),
                                       (17, 'Soy Sauce'),
                                       (18, 'Ginger'),
                                       (19, 'Vegetable Oil'),
                                       (20, 'Flour'),
                                       (21, 'Sugar'),
                                       (22, 'Cocoa Powder'),
                                       (23, 'Baking Powder'),
                                       (24, 'Milk'),
                                       (25, 'Vanilla Extract'),
                                       (26, 'Boiling Water'),
                                       (27, 'Avocado'),
                                       (28, 'Tomato'),
                                       (29, 'Lime Juice'),
                                       (30, 'Cilantro');

-- Insert the first admin user
INSERT INTO users (id, username, password, email,created, uuid, role_type) VALUES
    (1, 'admin', 'some-password', 'admin@example.com',NOW(),UUID(), 'ADMIN');

-- Insert recipes with categories and dietary preferences, setting creator to the admin user (id = 1)
  INSERT INTO recipes (id, recipe_name, description, instructions, dish_type, meal_type, dietary_preference, creator_id, is_private, estimated_time) VALUES
                                                                                                                                                         (1, 'Spaghetti Bolognese', 'A classic Italian pasta dish with a rich tomato meat sauce.', 'Cook pasta. In a separate pan, brown the meat, then add sauce and simmer. Combine and serve.', 'MAIN_COURSE', 'DINNER', 'NON_VEGETARIAN', 1, false, 45),
                                                                                                                                                         (2, 'Chicken Salad', 'A fresh and healthy salad with grilled chicken and mixed greens.', 'Grill chicken, slice, and mix with fresh greens and dressing.', 'MAIN_COURSE', 'LUNCH', 'NON_VEGETARIAN', 1, false, 30),
                                                                                                                                                         (3, 'Vegetable Stir-Fry', 'A colorful stir-fry with assorted vegetables and soy sauce.', 'Stir-fry vegetables in oil, add sauce, and serve hot.', 'MAIN_COURSE', 'DINNER', 'VEGAN', 1, false, 25),
                                                                                                                                                         (4, 'Chocolate Cake', 'A rich and moist chocolate cake perfect for dessert.', 'Mix ingredients, bake at 350°F for 30 minutes, and let cool.', 'DESSERT', 'DESSERT', 'VEGETARIAN', 1, false, 60),
                                                                                                                                                         (5, 'Guacamole', 'A creamy avocado dip with onions, tomatoes, and lime.', 'Mash avocados, mix with diced onions, tomatoes, and lime juice.', 'APPETIZER', 'SNACK', 'VEGAN', 1, false, 15),
                                                                                                                                                         (6, 'Pancakes', 'Fluffy pancakes perfect for breakfast.', 'Mix ingredients, pour batter onto griddle, cook until bubbles form, flip, and serve.', 'SNACK', 'BREAKFAST', 'VEGETARIAN', 1, false, 20),
                                                                                                                                                         (7, 'Caesar Salad', 'A classic Caesar salad with crisp romaine and creamy dressing.', 'Toss romaine with dressing, add croutons and Parmesan, and serve.', 'SIDE_DISH', 'LUNCH', 'NON_VEGETARIAN', 1, false, 15),
                                                                                                                                                         (8, 'French Toast', 'Golden, buttery French toast perfect for breakfast or brunch.', 'Dip bread in egg mixture, cook on griddle until golden, and serve with syrup.', 'SNACK', 'BREAKFAST', 'VEGETARIAN', 1, false, 25);


INSERT INTO recipe_ingredients (ingredient_id, recipe_id, amount, unit) VALUES
                                                                            (1, 1, 200, 'grams'),
                                                                            (2, 1, 150, 'grams'),
                                                                            (3, 1, 1, 'cup'),
                                                                            (4, 1, 1, 'medium'),
                                                                            (5, 1, 2, 'cloves'),
                                                                            (6, 1, 2, 'tablespoons'),
                                                                            (7, 1, 1, 'teaspoon'),
                                                                            (8, 1, 0.5, 'teaspoon');

-- Zutaten für Chicken Salad (Rezept ID 2)
INSERT INTO recipe_ingredients (ingredient_id, recipe_id, amount, unit) VALUES
                                                                            (9, 2, 150, 'grams'),
                                                                            (10, 2, 2, 'cups'),
                                                                            (11, 2, 10, 'pieces'),
                                                                            (12, 2, 0.5, 'medium'),
                                                                            (6, 2, 1, 'tablespoon'),
                                                                            (13, 2, 1, 'tablespoon'),
                                                                            (7, 2, 0.5, 'teaspoon'),
                                                                            (8, 2, 0.25, 'teaspoon');

-- Zutaten für Vegetable Stir-Fry (Rezept ID 3)
INSERT INTO recipe_ingredients (ingredient_id, recipe_id, amount, unit) VALUES
                                                                            (14, 3, 1, 'medium'),
                                                                            (15, 3, 1, 'medium'),
                                                                            (16, 3, 100, 'grams'),
                                                                            (17, 3, 2, 'tablespoons'),
                                                                            (5, 3, 1, 'clove'),
                                                                            (18, 3, 1, 'teaspoon'),
                                                                            (19, 3, 1, 'tablespoon');

-- Zutaten für Chocolate Cake (Rezept ID 4)
INSERT INTO recipe_ingredients (ingredient_id, recipe_id, amount, unit) VALUES
                                                                            (20, 4, 1.5, 'cups'),
                                                                            (21, 4, 1, 'cup'),
                                                                            (22, 4, 0.5, 'cup'),
                                                                            (23, 4, 1, 'teaspoon'),
                                                                            (7, 4, 0.5, 'teaspoon'),
                                                                            (24, 4, 1, 'cup'),
                                                                            (19, 4, 0.5, 'cup'),
                                                                            (25, 4, 1, 'teaspoon'),
                                                                            (26, 4, 0.5, 'cup');

-- Zutaten für Guacamole (Rezept ID 5)
INSERT INTO recipe_ingredients (ingredient_id, recipe_id, amount, unit) VALUES
                                                                            (27, 5, 2, 'pieces'),
                                                                            (4, 5, 0.25, 'cup'),
                                                                            (28, 5, 0.5, 'cup'),
                                                                            (29, 5, 1, 'tablespoon'),
                                                                            (7, 5, 0.25, 'teaspoon'),
                                                                            (30, 5, 1, 'tablespoon');

-- Zutaten für Pancakes (Rezept ID 6)
INSERT INTO recipe_ingredients (ingredient_id, recipe_id, amount, unit) VALUES
                                                                            (20, 6, 1, 'cup'),
                                                                            (21, 6, 1, 'tablespoon'),
                                                                            (23, 6, 1, 'teaspoon'),
                                                                            (7, 6, 0.5, 'teaspoon'),
                                                                            (24, 6, 1, 'cup'),
                                                                            (25, 6, 1, 'teaspoon');

-- Zutaten für Caesar Salad (Rezept ID 7)
INSERT INTO recipe_ingredients (ingredient_id, recipe_id, amount, unit) VALUES
                                                                            (10, 7, 2, 'cups'),
                                                                            (13, 7, 1, 'tablespoon'),
                                                                            (7, 7, 0.5, 'teaspoon'),
                                                                            (8, 7, 0.25, 'teaspoon');

-- Zutaten für French Toast (Rezept ID 8)
INSERT INTO recipe_ingredients (ingredient_id, recipe_id, amount, unit) VALUES
                                                                            (24, 8, 1, 'cup'),
                                                                            (21, 8, 1, 'tablespoon'),
                                                                            (25, 8, 1, 'teaspoon'),
                                                                            (19, 8, 2, 'tablespoons');