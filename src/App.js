import React from 'react';
import {useState, useEffect} from 'react';
import './App.css'


function App(){

  //Creating different usestates that are later on updated with different values
  const [addQuote, setAddQuote] = useState("");
  const [addComment, setAddComment] = useState("");
  const [editQuoteValue, setEditQuoteValue] = useState("");
  const [editCommentValue, setEditCommentValue] = useState("");
  const [someRandom, setSomeRandom] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [items, setItems] = useState([])

  //Using a useEffect to fetch data
  useEffect(() => {
    //Fetching data from specified url
    const getItems = async () => {
    const response = await fetch("http://localhost:3000/Quotes?_embed=comments")
    //Converting response to JSON
    const theItems = await response.json()
    
    //Updating the state of Items to the value of theItems
    setItems(theItems)
    }
    getItems()
  }
  //When the value of someRandom is updated, the useEffect will run again
  , [someRandom]) 



  /**
   *This function changes the display property in a specific div element.
   *That specific div element has a display property value of none, which is then changed to block
  *@param {number} itemId Refers to a specific div element
  */
  const showQuoteField = (itemId) => {
    document.getElementById("quoteDiv" + itemId).style.display = "block"
  }

  /**
   *This function changes the display property in a specific div element.
   *That specific div element has a display property value of none, which is then changed to block
  *@param {number} itemId Refers to a specific div element
  */
  const showCommentField = (itemId) => {
    document.getElementById("commentDiv" + itemId).style.display = "block"
  }
  
/**
 * This function takes the value of addQuote and sends a POST request with that value
 */
  const addQuotes = async () => {

    //Validating input fields, to check if user has entered a empty string value
    if(addQuote === "") {
      document.getElementById("errorAddQuote").innerHTML = "Please enter a text"
      return
    } else {
      document.getElementById("errorAddQuote").innerHTML = "You have added a quote"
    }

    //Updating the state of someRandom, causing useEffect to run again, to fetch the latest data
    setSomeRandom(Math.random())

    //Sending a POST request with the value of addQuote
    await fetch("http://localhost:3000/Quotes", {
      method: "POST",
      headers: {"Content-type" : "application/JSON"},
      body: JSON.stringify({
        description: addQuote
      })
    })
  }


/**
 * This function takes the value of addComment and sends a POST request with that value.
 * Also checks if the user has entered a value in the input field
 * @param {number} itemId Refers to the specific objects id
 */
  const addComments = async (itemId) => {

    //Validating input fields, to check if user has entered a empty string value
    if(addComment === "") {
      document.getElementById("errorAddComment" + itemId).innerHTML = "Please enter a text"
      return
    } else {
      document.getElementById("errorAddComment" + itemId).innerHTML = "You have added a comment"
    }

    //Updating the state of someRandom, causing useEffect to run again, to fetch the latest data
    setSomeRandom(Math.random())

    //Sending a POST request with the value of addComment and itemId
    await fetch("http://localhost:3000/Comments", {
      method: "POST",
      headers: {"Content-type" : "application/JSON"},
      body: JSON.stringify({
        
        description: addComment,
        quoteId: itemId
      })
    })
  }

  /**
 * This function takes the value of editCommentValue and sends a PUT request with that value.
 * Also checks if the user has entered a value in the input field
 * @param {number} itemId Refers to the specific objects id
 * @param {number} quoteId Refers to the specific objects quoteId value
 */
  const editComment = async (itemId, quoteId) => {

    //Validating input fields, to check if user has entered a empty string value
    if(editCommentValue === "") {
      document.getElementById("errorEditComment" + itemId).innerHTML = "Please enter a text"
      return
    } else {
      document.getElementById("errorEditComment" + itemId).innerHTML = "You have edited the comment"
    }


    //Updating the state of someRandom, causing useEffect to run again, to fetch the latest data
    setSomeRandom(Math.random())

    //Sending a PUT request with the value of itemId, editCommentValue and quoteId
    await fetch("http://localhost:3000/Comments/" + itemId, {
      method: "PUT",
      headers: {"Content-type" : "application/JSON"},
      body: JSON.stringify({
        id: itemId,
        description: editCommentValue,
        quoteId: quoteId

      })
    })
  }


  /**
 * This function takes the value of editQuoteValue and sends a PUT request with that value.
 * Also checks if the user has entered a value in the input field
 * @param {number} itemId Refers to the specific objects id
 */
  const editQuote = async (itemId) => {

    //Validating input fields, to check if user has entered a empty string value
    if(editQuoteValue === "") {
      document.getElementById("errorEditQuote" + itemId).innerHTML = "Please enter a text"
      return
    } else {
      document.getElementById("errorEditQuote" + itemId).innerHTML = "You have edited the quote"
    }

    //Updating the state of someRandom, causing useEffect to run again, to fetch the latest data
    setSomeRandom(Math.random())

    //Sending a PUT request with the value of itemId and editQuoteValue
    await fetch("http://localhost:3000/Quotes/" + itemId, {
      method: "PUT",
      headers: {"Content-type" : "application/JSON"},
      body: JSON.stringify({
        id: itemId,
        description: editQuoteValue
        
      })
    })
  }

/**
 * This function deletes a quote with a specific object id
 * @param {number} itemId Refers to the specific objects id
 */
  const deleteQuote = async (itemId) => {

      //Updating the state of someRandom, causing useEffect to run again, to fetch the latest data
      setSomeRandom(Math.random())

      //Sending a DELETE request with the value of itemId
      await fetch("http://localhost:3000/Quotes/" + itemId, {
      method: "DELETE",
      headers: {"Content-type" : "application/JSON"}})
  }

/**
 * This function deletes a comment with a specific object id
 * @param {number} itemId Refers to the specific objects id
 */
  const deleteComment = async (itemId) => {

    //Updating the state of someRandom, causing useEffect to run again, to fetch the latest data
    setSomeRandom(Math.random())

    //Sending a Delete request with the value of itemId
    await fetch("http://localhost:3000/Comments/" + itemId, {
    method: "DELETE",
    headers: {"Content-type" : "application/JSON"}})
}

  return(

  <div className={"flexbox-container"}>
    
    <h1 className={"Center"}>Welcome to a page with motivation</h1>

    <div className={"Center"}>

    <label id={"searchForItem"}>Search item</label>
    <br></br>

    {/*Changes the value of searchItem to the value entered in the input field*/}
    <input id={"searchForItem"} onChange={ (e)=> setSearchItem(e.target.value)}/>

    <br></br>
    <label id={"createQuotes"}>Add quote</label>
    <br></br>

    {/*Changes the value of addQuote to the value entered in the input field*/}
    <input id={"createQuotes"} onInput={(e)=> setAddQuote(e.target.value) }></input>

    {/*Button to add quote*/}
    <button onClick={addQuotes}>Add</button>

    {/*Displays a message if the user tries to add a quote with an empty value, and if they've added a quote*/}
    <p id={"errorAddQuote"}></p>
    <br></br>
    <br></br>

    </div>

    {
    //Filtering the items array to match the search value.
    items.filter((value) => {
      //If user has not entered a value, it will return all objects from items
      if (searchItem === ""){
        return value;
      }
      //If user has entered a value, it will return objects that match the search value
      else if (value.description.toLowerCase().includes(searchItem.toLowerCase())) {
        return value;
      }
      }).
      map((item) =>

        <div>

        {/*Displays the description of a specific object*/}
        <h2>{item.description}</h2>
        
        {/*Passes each function the item.id as a argument to refer to the specific object*/}
        {/*Deletes specific quote*/}
        <button onClick={()=> deleteQuote(item.id)}>Delete</button>

        {/*Onclick of this button, it will display the input field for editing a quote*/}
        <button onClick={()=> showQuoteField(item.id)}>Update</button>
        <br></br>

        {/*Changes the value of addComment to the value entered in input field*/}
        <input onInput={a => setAddComment(a.target.value) }></input>
        {/*Adds a comment to the specific quote*/}
        <button onClick={()=> addComments(item.id)}>Add a comment</button>
        <br></br>

        {/*Displays a message if the user tries to add a comment that is empty, and if they've added a comment*/}
        <p id={"errorAddComment" + item.id}></p>

        {/*A div containing input field and a button to edit a quote, and is only shown when user clicks the Update button*/}
        <div id={"quoteDiv" + item.id} style={{display:"none"}}>

        {/*Changes the value of editQuoteValue to the value entered in the input field*/}
        <input onInput={a => setEditQuoteValue(a.target.value) }></input>

        {/*Edits specific quote*/}
        <button onClick={()=> editQuote(item.id)}>Edit</button>

        <br></br>

        {/*Displays a message if the user tries to edit the quote with an empty value, and if they've edited the quote*/}
        <p id={"errorEditQuote" + item.id}></p>
        </div>
        
  {
  item.comments.map(anotherItem => (
    <div>

    {/*Displays the description of a specific comment*/}
    <p className={"someColor"}>{anotherItem.description}</p>

    {/*Deletes specific comment*/}
    <button onClick={()=> deleteComment(anotherItem.id)}>Delete</button>

    {/*Onclick of this button, it will display a input field for editing a comment*/}
    <button onClick={()=> showCommentField(anotherItem.id)}>Update</button>

    <br></br>

    {/*A div containing input field and a button to edit a comment, and is only shown when user clicks the Update button*/}
    <div id={"commentDiv" + anotherItem.id} style={{display: "none"}}>

    {/*Changes the value of editCommentValue to the value entered in the input field*/}
    <input onInput={(e)=> setEditCommentValue(e.target.value) }></input>

    {/*Edits specific comment*/}
    <button onClick={()=> editComment(anotherItem.id, anotherItem.quoteId)}>Edit</button>

    {/*Displays a message if the user tries to edit the comment with an empty value, and if they've edited the comment*/}
    <p id={"errorEditComment" + anotherItem.id}></p>
    </div>

    </div>
    ))
  }

  </div>
       
  )}
</div>
    
)
}

export default App