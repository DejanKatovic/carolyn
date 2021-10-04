import {Employee} from "./Employee";
import {IEmployeeOrgApp} from "./IEmployeeOrgApp";

interface FindResult {
  child: Employee;
  parent: Employee | null;
}

interface HistoryItem {
  employee: Employee;
  parent: Employee;
  supervisor: Employee;
  subordinates: Employee[];
}

interface History {
  position: number;
  record: HistoryItem[];
}

export class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;
  history: History;

  constructor(ceo: Employee) {
    this.ceo = ceo;
    this.history = {position: 0, record: []};
  }

  find(id: number, child: Employee, parent: Employee): FindResult | null {
    if (child.uniqueId === id && parent !== null) {
      return {child, parent};
    }
    let result: FindResult | null = null;
    parent = child;
    child.subordinates.some((subordinate: Employee) => {
      child = subordinate;
      result = this.find(id, child, parent);
      if (result) return true;
    })
    return result;
  }

  move(employeeID: number, supervisorID: number) {
    if (employeeID === supervisorID)
      return;
    const employee = this.find(employeeID, this.ceo, null);
    if (!employee)
      return;
    const supervisor = this.find(supervisorID, this.ceo, null);
    if (!supervisor)
      return;

    this.history.record.splice(this.history.position);
    this.history.record.push({
      employee: employee.child,
      parent: employee.parent,
      supervisor: supervisor.child,
      subordinates: employee.child.subordinates,
    });
    this.history.position++;

    employee.parent.subordinates = employee.parent.subordinates.filter((item) => item !== employee.child);
    employee.child.subordinates.forEach((item) => employee.parent.subordinates.push(item));
    employee.child.subordinates = [];
    supervisor.child.subordinates.push(employee.child);
  }
  
  undo() {
    if (this.history.position === 0)
      return;
    
    const historyItem = this.history.record[this.history.position - 1];
    historyItem.parent.subordinates = historyItem.parent.subordinates.filter((item) => 
      (historyItem.subordinates.indexOf(item) < 0)
    );
    historyItem.supervisor.subordinates = historyItem.supervisor.subordinates.filter((item) => item !== historyItem.employee);
    historyItem.subordinates.forEach((item) => historyItem.employee.subordinates.push(item));
    historyItem.parent.subordinates.push(historyItem.employee);
    this.history.position--;
  }

  redo() {
    if (this.history.position === this.history.record.length)
      return;

    const historyItem = this.history.record[this.history.position];
    historyItem.parent.subordinates = historyItem.parent.subordinates.filter((item) => item !== historyItem.employee);
    historyItem.employee.subordinates.forEach((item) => historyItem.parent.subordinates.push(item));
    historyItem.employee.subordinates = [];
    historyItem.supervisor.subordinates.push(historyItem.employee);
    this.history.position++;
  }
}
