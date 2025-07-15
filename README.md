# FinanTrack - Web System Controlling Commercial Finances
This repository contains the final project for the Software Engineering course undertaken in the first semester of 2025. 

## System Overview
This is a comprehensive web system developed with Laravel for the backend, focused on helping merchants manage their finances and business operations. It offers features for managing accounts, transactions, budgets, investments, accounts payable, customers, suppliers, and products, as well as a robust authentication system that supports different user profiles (merchant and employee).

## Main features
The system is divided into modules to facilitate financial and commercial management:

### 1. Authentication and User Management
- **User Registration:** Allows new users to register as "merchant."
- **Login and Logout:** Authentication system based on JWT (JSON Web Tokens).
- **Password Recovery:** Password reset functionality via email.
- **Profile Update:** Users can update their information, including name, email, password, interface theme, and notification settings.
- **Employee Management (for Merchants):** 
  1. Merchants can register new employees by specifying their name, email address, role (employee or merchant), and status (active/inactive). A random password is generated and returned upon registration.
  2. List all employees associated with the logged in merchant.
  3. View details for a specific employee.
  4. Update information for an existing employee.
  5. Delete employees.

### 2. Financial Account Management
- **Account List:** View all of the user's financial accounts (Checking, Savings, Credit Card).
- **Account Creation:** Allows you to create new accounts, with the option to set an initial balance that generates a corresponding transaction.
- **Balance Inquiry:** Displays the current balance of a specific account.

### 3. Transaction Management
- **Transaction Log:** Adds new transactions with details such as account, amount (positive for income, negative for expenses), category, subcategory, description, date, location (optional), and recurrence indicator.
- **Transaction List:** Displays all user transactions, sorted by date.
- **Transaction View:** Details of a specific transaction.
- **Transaction Update:** Modifies information on existing transactions.
- **Transaction Delete:** Removes transactions.

### 4. Budget Management
- **budget List:** View all budgets created by the user.
- **Budget Creation:** Define budgets with name, amount, and amount already spent.
- **Budget View:** Details of a specific budget.
- **Budget Update:** Modify existing budgets.
- **Budget Deletion:** Remove budgets.

### 5. Investment Management
- **Investment Creation:** Registers new investments with their name, initial value, and current value.
- **Investment Summary:** Calculates the total current value and the gain/loss percentage for all user investments.

### 6. Accounts Payable Management (Bills)
- **Account Creation:** Registers accounts payable with name, amount, and due date.
- **Accounts Due:** Lists unpaid accounts due within the next 7 days, generating automatic notifications.

### 7. Financial Goal Management
- **Goal List:** View all of the user's financial goals.
- **Goal Creation:** Define goals with a name and value.

### 8. Customer Management
- **Customer Creation:** Registers new customers with name, CPF/CNPJ (unique per merchant), telephone number, address, date of birth and purchase history.

### 9. Supplier Management
- **Creating Suppliers:** Registers new suppliers with name, CNPJ (unique per merchant) and contact details.

### 10. Product Management
- **Product Listing:** Displays all products registered by the logged-in merchant.
- **Product Creation:** Adds new products with name, SKU (unique), price, inventory, and category.
- **Product View:** Details of a specific product.
- **Product Update:** Modifies information for existing products.
- **Product Deletion:** Removes products.

### 11. Reports and Insights
- **Financial Reports:**
  1. **Cash Flow:** Monthly income and expenses.
  2. **Expenses by Category:** Total expenses grouped by category.
  3. **Budget Report:** Comparison between the budgeted amount and the amount spent.
- **Export Reports:** Allows you to export reports in CSV format.
- **Insights:** Provides information such as monthly expenses and main expense categories, with financial recommendations.

### 12. Notifications
- **Notification List:** Displays all user notifications.
- **Mark as Read:** Option to mark all notifications as read.
- **Toggle Read Status:** Changes the read status of an individual notification.
- **Automatic Generation:** Generates notifications for bills that are close to due.

## Technologies Used
- **Backend:** Laravel (PHP Framework)
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** SQLite (default configuration, but can be configured for MySQL, PostgreSQL, etc.)
- **Development Tools:** Composer, Vite, npm

## Project Structure
- `backend/app/Http/Controllers`: Contains the business logic for each functionality (authentication, accounts, transactions, etc.).
- `backend/app/Models`: Defines Eloquent models for database entities (User, Account, Transaction, etc.).
- `backend/database/migrations`: Contains the migration files for the database structure.
- `backend/routes/api.php`: Defines API routes for all functionality.
- `backend/config`: Configuration files for the application, database, JWT, etc.
- `backend/resources/css`: Contains the front end files (CSS and JavaScript) that are compiled by Vite.

## How to Configure and Run the Project
### **Prerequisites:**
  1. PHP >= 8.2
  2. Composer
  3. Node.js e npm
  4. A web server (Apache, Nginx, or the PHP development server)

### **Steps for Configuration:**
  1. Clone the Repository:
     1. `git clone <URL_DO_SEU_REPOSITORIO> web-system-controlling-commercial-finances`
     2. `cd web-system-controlling-commercial-finances/backend`
  2. Install Composer Dependencies:
     `composer install`
  3. Install Node.js Dependencies:
     `npm install`
  4. Copy the Environment File:
     `cp .env.example .env`
  5. Generate the Application Key:
     `php artisan key:generate`
  6. Generate the JWT Key:
     `php artisan jwt:secret`
  7. Configure the Database:
     - Open the .env file and set the environment variables for your database. By default, it uses SQLite. If you want to use SQLite, make sure the file `database/database.sqlite` exists (you can create it with `touch database/database.sqlite`).
     - Example for SQLite:
       1. DB_CONNECTION=sqlite
       2. DB_DATABASE=/path/to/your/database.sqlite (optional, if not in default directory)
     - Example for MySQL:
       1. DB_CONNECTION=mysql
       2. DB_HOST=127.0.0.1
       3. DB_PORT=3306
       4. DB_DATABASE=your_database_name
       5. DB_USERNAME=your_username
       6. DB_PASSWORD=your_password
  
  8. Run Database Migrations:
     `php artisan migrate`
  9. Compile Frontend Assets:
      `npm run build`
     - For development, you can use:
     `npm run dev`
     - This will start the Vite server for automatic reloading.

  10. Start the Laravel Server:
      `php artisan serve`

## API Usage
The API can be accessed through the routes defined in backend/routes/api.php. You'll need a JWT token to access most protected endpoints.

### Example Authentication Flow:
#### Registration:
- Endpoint: `POST /api/register`
- Request Body:
  ```json
  {
    "name": "Merchant Name",
    "email": "merchant@example.com",
    "password": "password",
    "password_confirmation": "password"
  }

#### Login:
- Endpoint: `POST /api/login`
- Request Body:
  ```json
  {
    "email": "merchant@example.com",
    "password": "password"
  }

#### Accessing Protected Endpoints:
- Include the JWT token in the `Authorization` header as a Bearer token: `Authorization: Bearer SEU_TOKEN_JWT`
- Example: List Accounts:
  1. Endpoint: `GET /api/accounts`
  2. Cabeçalhos: `Authorization: Bearer SEU_TOKEN_JWT`

## Contribution
Contributions are welcome! Feel free to open issues for bugs or feature suggestions, or submit pull requests for improvements.

## Application available at
http://3.17.67.137/

## Contributors to the project
- Alisson Rodrigues Fernandes
- Cicero Rodrigues da Silva Neto
- Francisca Ariane dos Santos da Silva
- Monalisa Silva Bezerra
- Raissa Ivyna Moreira de Oliveira

## Project supervising professor
Dra. Carla Ilane Moreira Bezerra

## License
This project is open source and licensed under the [MIT License](https://opensource.org/licenses/MIT).

