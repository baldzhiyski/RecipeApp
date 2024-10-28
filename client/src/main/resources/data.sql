-- Insert recipes
INSERT INTO recipes (id, recipe_name, description, instructions) VALUES
                                                                     (1, 'Spaghetti Bolognese', 'A classic Italian pasta dish with a rich tomato meat sauce.', 'Cook pasta. In a separate pan, brown the meat, then add sauce and simmer. Combine and serve.'),
                                                                     (2, 'Chicken Salad', 'A fresh and healthy salad with grilled chicken and mixed greens.', 'Grill chicken, slice, and mix with fresh greens and dressing.'),
                                                                     (3, 'Vegetable Stir-Fry', 'A colorful stir-fry with assorted vegetables and soy sauce.', 'Stir-fry vegetables in oil, add sauce, and serve hot.'),
                                                                     (4, 'Chocolate Cake', 'A rich and moist chocolate cake perfect for dessert.', 'Mix ingredients, bake at 350°F for 30 minutes, and let cool.'),
                                                                     (5, 'Guacamole', 'A creamy avocado dip with onions, tomatoes, and lime.', 'Mash avocados, mix with diced onions, tomatoes, and lime juice.');

-- Insert ingredients for Spaghetti Bolognese (Recipe ID 1)
INSERT INTO ingredients (name, amount, unit, recipe_id) VALUES
                                                            ('Spaghetti', 200, 'grams', 1),
                                                            ('Ground Beef', 150, 'grams', 1),
                                                            ('Tomato Sauce', 1, 'cup', 1),
                                                            ('Onion', 1, 'medium', 1),
                                                            ('Garlic', 2, 'cloves', 1),
                                                            ('Olive Oil', 2, 'tablespoons', 1),
                                                            ('Salt', 1, 'teaspoon', 1),
                                                            ('Black Pepper', 0.5, 'teaspoon', 1);

-- Insert ingredients for Chicken Salad (Recipe ID 2)
INSERT INTO ingredients (name, amount, unit, recipe_id) VALUES
                                                            ('Chicken Breast', 150, 'grams', 2),
                                                            ('Mixed Greens', 2, 'cups', 2),
                                                            ('Cherry Tomatoes', 10, 'pieces', 2),
                                                            ('Cucumber', 0.5, 'medium', 2),
                                                            ('Olive Oil', 1, 'tablespoon', 2),
                                                            ('Lemon Juice', 1, 'tablespoon', 2),
                                                            ('Salt', 0.5, 'teaspoon', 2),
                                                            ('Black Pepper', 0.25, 'teaspoon', 2);

-- Insert ingredients for Vegetable Stir-Fry (Recipe ID 3)
INSERT INTO ingredients (name, amount, unit, recipe_id) VALUES
                                                            ('Bell Pepper', 1, 'medium', 3),
                                                            ('Carrot', 1, 'medium', 3),
                                                            ('Broccoli', 100, 'grams', 3),
                                                            ('Soy Sauce', 2, 'tablespoons', 3),
                                                            ('Garlic', 1, 'clove', 3),
                                                            ('Ginger', 1, 'teaspoon', 3),
                                                            ('Vegetable Oil', 1, 'tablespoon', 3);

-- Insert ingredients for Chocolate Cake (Recipe ID 4)
INSERT INTO ingredients (name, amount, unit, recipe_id) VALUES
                                                            ('Flour', 1.5, 'cups', 4),
                                                            ('Sugar', 1, 'cup', 4),
                                                            ('Cocoa Powder', 0.5, 'cup', 4),
                                                            ('Baking Powder', 1, 'teaspoon', 4),
                                                            ('Salt', 0.5, 'teaspoon', 4),
                                                            ('Milk', 1, 'cup', 4),
                                                            ('Vegetable Oil', 0.5, 'cup', 4),
                                                            ('Vanilla Extract', 1, 'teaspoon', 4),
                                                            ('Boiling Water', 0.5, 'cup', 4);

-- Insert ingredients for Guacamole (Recipe ID 5)
INSERT INTO ingredients (name, amount, unit, recipe_id) VALUES
                                                            ('Avocado', 2, 'pieces', 5),
                                                            ('Onion', 0.25, 'cup', 5),
                                                            ('Tomato', 0.5, 'cup', 5),
                                                            ('Lime Juice', 1, 'tablespoon', 5),
                                                            ('Salt', 0.25, 'teaspoon', 5),
                                                            ('Cilantro', 1, 'tablespoon', 5);
