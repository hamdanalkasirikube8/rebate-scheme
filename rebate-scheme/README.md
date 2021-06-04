# RebateScheme

The project is built with Angular 10. Bootstrap 4 and Angular components are used to create the user interface.
A valid CSV file would contain headers in double quotes such as "organ", "cash", "price" and "bonus_ratio". The type of "organ" is a string while the other inputs are positive whole numbers. The users are required to select an input file then click the "process orders" button to generate results and view them by clicking any input order in the table.
Currently, the rebate scheme is set to fixed values according to the task description. In future, the app will also allow to create scheme from the UI.

## Environment setup

Run `npm i` in root directory where package.json exists. This will install all the required depedencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` to open the application.

## Application workflow

- The first step is to choose a CSV file.
- The CSV file is read and its data is displayed in a table.
- To view the results it is necessary to click the process orders button.
- After the orders are processed, the user can see the results of each separate order by clicking the row in the in a cart and table view.
