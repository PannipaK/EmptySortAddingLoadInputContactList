window.onload = init;

// The contact manager as a global variable
let abm;
/**
 * Function Name: init()
 * This method creates and intializes a new instance of AddressBookManager
 */
function init() {
  // create an instance of the contact manager
  abm = new AddressBookManager();
}
/**
 * Class Name: Contact
 * This class takes both name and email to instantiate itself
 */
class Contact {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}
// ====================================================================
//            !!! DO NOT MODIFY ABOVE THIS LINE!!!
// ====================================================================

/**
 * Function Name: formSubmitted()
 * This function takes both name and email from the HTML to create
 * an instance of Contact object for storage in the AddressBookManager
 * referenced by the global variable, abm.
 * This function returns a boolean to avoid form submission via HTTP
*/
function formSubmitted() {
  let name=document.getElementById("name").value;
  let email=document.getElementById("email").value;
  mycontact=new Contact(name, email);
  console.log(mycontact);
  abm.add(mycontact);
  abm.displayContactTable("contacts");
  return false;
  // YOUR CODE HERE - FROM YOUR PREVIOUS ASSIGNMENT
}
/**
 * Function Name: emptyList()
 * This function empties the contact list in AddressBookManager
 * and displays the default "No contacts to display!" message.
*/
function emptyList() {
  abm.empty();
  // YOUR CODE HERE - FROM YOUR PREVIOUS ASSIGNMENT
}
/**
 * Function Name: sortList()
 * This function sorts the contact list by name in descending
 * alphabetical order, by invoking AddressBookManager's sort() and
 * displaying the result in the table display area.
 */
function sortList() {
  abm.sort();
  // YOUR CODE HERE
}
/**
 * Function Name: saveList()
 * This function saves the contact list in HTML Web Storage's
 * localStorage. You will invoke AddressBookManager's save() to
 * accomplish this.
 */
function saveList() {
  abm.save();
  // YOUR CODE HERE
}
/**
 * Function Name: loadList()
 * This function loads the contact list from HTML Web Storage's
 * localStorage. You will invoke AddressBookManager's load() and
 * display the loaded list into the table display area.
 */
function loadList() {
  abm.load();
  // YOUR CODE HERE
}
/**
 * Class Name: AddressBookManager
 * This class initializes an empty contact list. This class has
 * THREE (3) methods:
 *    1. empty(): empty contact list.
 *    2. add(contact): add a named contact to list.
 *    3. displayContactTable(htmlId): displays the contact list in a
 *       table format; if there is no contact in the list, print
 *       "No contacts to display!" in HTML.
*/
class AddressBookManager {
  constructor() {
    this.listOfContacts = [];
  }
  /**
   * Method Name: empty()
   * This method empties the contact list.
  */
  empty() {
    this.listOfContacts.length=0;
    this.displayContactTable("contacts");
    // YOUR CODE HERE - FROM YOUR PREVIOUS ASSIGNMENT
  }
  /**
   * Method Name: add(contact)
   * This method adds the named contact to the contact list.
  */
  add(contact) {
    this.listOfContacts.push(contact);
    // YOUR CODE HERE - FROM YOUR PREVIOUS ASSIGNMENT
  }
  /**
   * Method Name: displayContactTable(htmlId)
   * This method clears the prior table content and displays
   * the new table content from the non-empty contact list in
   * a correctly formatted HTML table. If the contact list is
   * empty, this method prints a "No contacts to display!"
   * message in HTML as depicted in the demo.
  */
  displayContactTable(htmlId) {
    var table=document.createElement("table");

    if (table){
      table.remove();
    }
    var contacts = document.getElementById(htmlId);
    contacts.innerHTML="";
    if (this.listOfContacts.length==0){
      contacts.innerHTML="No contacts to display";
      return;
    }
    var tbl = document.createElement("table");
    //1.Set the id attribute of tbl to “table”
    tbl.setAttribute("id","table");
    //2. Get the element with id htmlId and append tbl to it as a child element
    contacts.appendChild(tbl);

    for (var index=0; index<this.listOfContacts.length; index++){
      var contact=this.listOfContacts[index];
      var row=tbl.insertRow(tbl.length);
      var cell_name=row.insertCell(0);
      var cell_email=row.insertCell(1);
      cell_name.innerHTML=contact.name;
      cell_email.innerHTML=contact.email;
    }
    // YOUR CODE HERE - FROM YOUR PREVIOUS ASSIGNMENT
  }

  /**
   * Method name: sort()
   * This method sorts the contact list elements by descending alphabetical
   * order. For example:
   * Original list: "Joe", "Kay", "Zoe"
   * Sorted list in descending order: "Zoe", "Kay", "Joe"
   * You may want to check: https://www.w3schools.com/jsref/jsref_sort.asp
   */
  sort(){
    this.listOfContacts.sort(this.compare);
    this.displayContactTable("contacts");//this will update the webpage so that
    //when they click sort, it will re-render the list sorted
    // YOUR CODE HERE
  }

  compare(a, b){
    if (a.name > b.name){
      return 1;
    }
    return -1;
  }

  /**
   * Method name: load()
   * This method loads the contact list string from HTML Web Storage's
   * localStorge back.
   */
  load() {
    let myJSON = localStorage.getItem("myList");//Get the JSON string from storage
    let objList = JSON.parse(myJSON);//Convert the json string into a JavaScript object

    this.listOfContacts=[]; // clear the list
    for(let i=0; i<objList.length; i++){
      let obj=objList[i];
      console.log(objList[i]);

      let person= new Contact(obj.name, obj.email);
      this.listOfContacts.push(person);
    }
     this.displayContactTable("contacts");//this will update the webpage so that
     //when they click load, it will render the loaded list
    // YOUR CODE HERE
  }
  /**
   * Method name: save()
   * This method saves the contact list into a JSON string in
   * HTML Web Storage's localStorage.
   */
  save() {
    let rawlist=[];

    for(let i=0; i<this.listOfContacts.length; i++){
      let contact=this.listOfContacts[i];

      //convert the contact to a JavaScript object
      let obj = { name: contact.name, email: contact.email };
      rawlist.push(obj);
    }
    let myJson = JSON.stringify(rawlist);
    localStorage.setItem("myList", myJson);
    // YOUR CODE HERE
     }
    }
