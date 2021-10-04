import {Employee} from "../src/Employee"

const employee3: Employee = {
  uniqueId: 4,
  name: "Mary Blue",
  subordinates: []
}

const employee6: Employee = {
  uniqueId: 7,
  name: "Will Turner",
  subordinates: []
}

const employee5: Employee = {
  uniqueId: 6,
  name: "Tina Teff",
  subordinates: [employee6]
}

const employee4: Employee = {
  uniqueId: 5,
  name: "Bob Saget",
  subordinates: [employee5]
}

const employee2: Employee = {
  uniqueId: 3,
  name: "Cassandra Reynolds",
  subordinates: [employee3, employee4]
}

const employee1: Employee = {
  uniqueId: 2,
  name: "Sarah Donald",
  subordinates: [employee2]
}

const employee9: Employee = {
  uniqueId: 10,
  name: "Thomas Brown",
  subordinates: []
}

const employee8: Employee = {
  uniqueId: 9,
  name: "Harry Tobs",
  subordinates: [employee9]
}

const employee10: Employee = {
  uniqueId: 11,
  name: "George Carrey",
  subordinates: []
}

const employee11: Employee = {
  uniqueId: 12,
  name: "Gary Styles",
  subordinates: []
}

const employee7: Employee = {
  uniqueId: 9,
  name: "Tyler Simpson",
  subordinates: [employee8, employee10, employee11]
}

const employee12: Employee = {
  uniqueId: 13,
  name: "Bruce Willis",
  subordinates: []
}

const employee14: Employee = {
  uniqueId: 15,
  name: "Sophie Turner",
  subordinates: []
}

const employee13: Employee = {
  uniqueId: 14,
  name: "Georgina Flangy",
  subordinates: [employee14]
}

export const ceo: Employee = {
  uniqueId: 1,
  name: "Mark Zuckerberg",
  subordinates: [employee1, employee7, employee12, employee13]
}
