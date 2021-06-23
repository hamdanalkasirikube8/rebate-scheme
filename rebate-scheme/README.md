# RebateScheme

The application is based on a rebate scheme which gives free human organs. Given promotion scheme is as follows:
| organs (N) purchased        | free organ(s) received   |
| ------------- |:-------------:| -----:|-----:|
| heart x3         | heart x1            | 5 |   2 |
| liver x2         | lung x1            | 3 |   3 |
| lung x4	liver x1        | heart x1          | 3 |   4 |

The application when run, processes customer orders and outputs clear information regarding the total number of products the customer is to receive.
The application read orders from csv files. Each line in the CSV will represent a single order. These orders will include a bonus_ratio, which serves as the actual ratio at which free products will be awarded for a given order. In other words, the bonus_ratio is the (N) value in the table above:

Example Order Input
// select a csv file
| organ        | cash           | price  | bonus_ratio  |
| ------------- |:-------------:| -----:|-----:|
| liver         | 10            | 5 |   2 |
| heart         | 10            | 3 |   3 |
| lung         | 25          | 3 |   4 |

Example Order Output for given inputs
|    |            |   |
| ------------- |:-------------:| -----:|
| heart 0         | liver 2          | lung 1 |   
| heart 4        | liver 0            | lung 0 |   
| heart 2         | liver 2          | lung 8 |   


As an explanation, the first order results in 2 livers and 1 lung because the customer has enough cash to purchase 2 livers outright (cash (10) / price (5) = result (2)). Following, they are able to take advantage of the liver => lung rebate as they meet the bonus_ratio criteria of 2:1 (purchased (2) / bonus_ratio (2) = bonuses (1)). If they had provided enough cash to purchase 4 livers, then they would have then been eligible to receive 2 bonuses (i.e. 2 lungs!).


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
