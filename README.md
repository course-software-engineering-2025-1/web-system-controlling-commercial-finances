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

## Unit Tests

Unit tests were written focusing on individual components of the application, such as class methods or standalone functions.

### 1. AuthController.php  
This controller handles user authentication (registration, login, etc.).

#### Test Scenarios

- **User Registration**  
  - Successful registration of a new merchant.  
  - Attempt to register with an email that already exists.  
  - Attempt to register with invalid data (e.g. password too short).

- **User Login**  
  - Successful login with correct credentials.  
  - Login attempt with invalid credentials.  
  - Login attempt by an inactive user.

- **User Logout**  
  - Successful logout.

- **Password Recovery**  
  - Password reset request for an existing email.  
  - Password reset request for a non‑existent email.

- **Password Reset**  
  - Successful password reset with a valid token.  
  - Password reset attempt with an invalid token.  
  - Password reset attempt when new passwords do not match.

- **Profile Update**  
  - Successful update of user name and email.  
  - Attempt to update email to one that already exists.  
  - Password update.

- **Employee Registration (by Merchant)**  
  - Successful registration of a new employee by a merchant.  
  - Attempt to register an employee with an email that already exists.  
  - Attempt to register an employee by a non‑merchant user.

- **List Employees**  
  - List employees associated with the logged‑in merchant.  
  - Attempt to list employees by a non‑merchant user.

- **Get Specific Employee**  
  - Retrieve details of a specific employee belonging to the merchant.  
  - Attempt to retrieve an employee who does not belong to the merchant.  
  - Attempt to retrieve a non‑existent employee.

- **Update Employee**  
  - Successful update of employee data.  
  - Attempt to update an employee who does not belong to the merchant.

- **Delete Employee**  
  - Successful deletion of an employee.  
  - Attempt to delete an employee who does not belong to the merchant.

---

### 2. AccountController.php  
This controller manages users’ financial accounts.

#### Test Scenarios

- **List Accounts**  
  - List all accounts of the logged‑in user with calculated balances.

- **Create Account**  
  - Successful creation of a new account with no initial balance.  
  - Successful creation with a positive initial balance (income transaction).  
  - Successful creation with a negative initial balance (expense transaction).  
  - Attempt to create an account with an invalid type.  
  - Attempt to create an account with an empty name.

- **View Account Balance**  
  - View balance of a specific account belonging to the logged‑in user.  
  - Attempt to view balance of an account that does not belong to the user.  
  - Attempt to view a non‑existent account.

---

### 3. TransactionController.php  
This controller handles financial transactions.

#### Test Scenarios

- **Create Transaction**  
  - Successful creation of an income transaction.  
  - Successful creation of an expense transaction.  
  - Attempt to create a transaction with an invalid `accountId`.  
  - Attempt to create a transaction with a non‑numeric `amount`.  
  - Attempt to create a transaction with an invalid date.

- **List Transactions**  
  - List all transactions of the logged‑in user, ordered by date.

- **View Specific Transaction**  
  - View a specific transaction belonging to the logged‑in user.  
  - Attempt to view a transaction that does not belong to the user.  
  - Attempt to view a non‑existent transaction.

- **Update Transaction**  
  - Successful update of a transaction (change amount, category, etc.).  
  - Automatic update of transaction type (income/expense) when amount changes.  
  - Attempt to update a transaction that does not belong to the user.  
  - Attempt to update a non‑existent transaction.

- **Delete Transaction**  
  - Successful deletion of a transaction.  
  - Attempt to delete a transaction that does not belong to the user.  
  - Attempt to delete a non‑existent transaction.

---

### 4. ProductsController.php  
This controller manages a merchant’s products.

#### Test Scenarios

- **List Products**  
  - List products belonging to the logged‑in merchant.  
  - Ensure employees cannot list products of other merchants.

- **Create Product**  
  - Successful creation of a new product.  
  - Attempt to create a product with a duplicate SKU.  
  - Attempt to create a product with invalid data (e.g. non‑numeric price, negative stock).

- **View Specific Product**  
  - View a specific product belonging to the merchant.  
  - Attempt to view a product that does not belong to the merchant.  
  - Attempt to view a non‑existent product.

- **Update Product**  
  - Successful update of a product.  
  - Attempt to update a product that does not belong to the merchant.  
  - Attempt to update a non‑existent product.

- **Delete Product**  
  - Successful deletion of a product.  
  - Attempt to delete a product that does not belong to the merchant.  
  - Attempt to delete a non‑existent product.

---

### 5. CustomerController.php  
This controller manages a merchant’s customers.

#### Test Scenarios

- **Create Customer**  
  - Successful creation of a new customer.  
  - Attempt to create a customer with a duplicate `cpf_cnpj` for the same merchant.  
  - Attempt to create a customer with invalid data (e.g. empty name, invalid birth date).

---

### 6. SupplierController.php  
This controller manages a merchant’s suppliers.

#### Test Scenarios

- **Create Supplier**  
  - Successful creation of a new supplier.  
  - Attempt to create a supplier with a duplicate CNPJ for the same merchant.  
  - Attempt to create a supplier with invalid data (e.g. empty name, empty contact).

---

### 7. BillController.php  
This controller manages accounts payable.

#### Test Scenarios

- **Create Bill**  
  - Successful creation of a new bill.  
  - Attempt to create a bill with invalid data (e.g. negative amount, invalid date).

- **Upcoming Bills**  
  - List bills due within the next 7 days for the user.  
  - Ensure paid bills are not listed.

---

### 8. BudgetController.php  
This controller manages budgets.

#### Test Scenarios

- **List Budgets**  
  - List all budgets. (Currently lists all, ideally should filter by user.)

- **Create Budget**  
  - Successful creation of a new budget.  
  - Attempt to create a budget with invalid data (e.g. negative amount).

- **View Specific Budget**  
  - View a specific budget.

- **Update Budget**  
  - Successful update of a budget.  
  - Update the `spent` field.

- **Delete Budget**  
  - Successful deletion of a budget.

---

### 9. GoalController.php  
This controller manages financial goals.

#### Test Scenarios

- **List Goals**  
  - List all goals of the logged‑in user.

- **Create Goal**  
  - Successful creation of a new goal.  
  - Attempt to create a goal with invalid data (e.g. negative amount).

---

### 10. InvestmentController.php  
This controller manages investments.

#### Test Scenarios

- **Create Investment**  
  - Successful creation of a new investment.  
  - Attempt to create an investment with invalid data (e.g. negative values).

- **Investment Summary**  
  - Correct calculation of total current value and percentage gain/loss.  
  - Scenario with zero investments.

---

### 11. NotificationController.php  
This controller manages notifications.

#### Test Scenarios

- **List Notifications**  
  - List all notifications of the logged‑in user, ordered by date.

- **Mark All as Read**  
  - Mark all notifications as read.

- **Toggle Read Status**  
  - Toggle the read status of a specific notification.

- **Create Notification**  
  - Successful creation of a new notification.

- **Generate Notifications**  
  - Generate notifications for bills due soon, avoiding duplicates.

---

### 12. InsightsController.php  
This controller provides financial insights.

#### Test Scenarios

- **Generate Insights**  
  - Correct calculation of monthly spending.  
  - Identification of top expense categories.  
  - Return of recommendations.  
  - Scenario with no transactions.

---

### 13. ReportController.php  
This controller generates financial reports.

#### Test Scenarios

- **Cashflow Report**  
  - Generate monthly income and expense data.  
  - Export to CSV.

- **Expenses by Category Report**  
  - Generate expense data grouped by category.  
  - Export to CSV.

- **Budget Report**  
  - Generate budget data, spending, and status.  
  - Export to CSV.

- **Invalid Report Type**  
  - Return an error for unsupported report types.

---

## System Tests

System tests were executed to verify end‑to‑end flows, simulating user interactions and ensuring modules work together as expected.

### 1. Full Merchant & Employee Flow

1. **Merchant Registration**  
   - A new merchant registers.  
   - The merchant logs in.

2. **Employee Management**  
   - The merchant registers a new employee.  
   - The employee attempts to log in (should be inactive by default).  
   - The merchant activates the employee.  
   - The employee logs in successfully.  
   - The employee attempts to access merchant‑only resources (should be denied).  
   - The merchant updates employee data.  
   - The merchant deletes the employee.

3. **Product Management**  
   - The merchant adds a product.  
   - The employee attempts to add a product (if allowed by business rules).  
   - Merchant/employee lists products.  
   - Merchant/employee updates a product.  
   - Merchant/employee deletes a product.

---

### 2. Full Financial Flow

1. **Initial Setup**  
   - A user (merchant) registers and logs in.  
   - The user creates a “Checking” account and a “Savings” account.

2. **Transactions & Balances**  
   - The user records a “salary” transaction in Checking (income).  
   - The user records a “rent” transaction in Checking (expense).  
   - Verify Checking balance is correct.  
   - The user transfers money from Checking to Savings (two transactions: expense in Checking, income in Savings).  
   - Verify both account balances.

3. **Budgets & Goals**  
   - The user creates a budget for “Food”.  
   - The user records expense transactions in the “Food” category.  
   - Verify the budget reflects the spending.  
   - The user creates a “Trip” goal.

4. **Bills & Notifications**  
   - The user adds a bill (“Electricity”) with a near‑due date.  
   - Verify a notification is generated for the bill.  
   - Mark the notification as read.

5. **Reports & Insights**  
   - Generate the cashflow report and verify data structure.  
   - Generate the expenses‑by‑category report and verify key categories.  
   - Access insights and verify monthly spend and recommendations.

---

### 3. Authorization & Concurrency Tests

- **Unauthorized Access**  
  - Attempt to access protected endpoints without a JWT token.  
  - Attempt with an invalid or expired JWT.  
  - An employee attempts to access a merchant‑only endpoint (e.g. register another employee).  
  - A merchant attempts to access an endpoint they should not have (if any).

- **Concurrency Scenarios**  
  - Simulate multiple users creating transactions simultaneously on the same account to verify balance consistency (may require mocks or a more advanced test setup).  


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

More details about the application can be found in the pdf file of this repository.
