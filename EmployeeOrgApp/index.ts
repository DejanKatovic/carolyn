import {EmployeeOrgApp} from "./src/EmployeeOrgApp";
import {ceo} from "./mocks/mocks";

const app = new EmployeeOrgApp(ceo);

app.move(2, 14);
console.log(...app.ceo.subordinates);

app.undo();
console.log(...app.ceo.subordinates);

app.redo();
console.log(...app.ceo.subordinates);
