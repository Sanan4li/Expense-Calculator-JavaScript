
    
   DisplayMonth();
    var ExpenseId = 0;    
    var IncomeId = 0;     

    // To store Data of Expenses and Incomes
         var Data = {
             AllExpenses : {} , 
             AllIncomes : {} , 
              TotalExpense:0 , 
            TotalIncome :0
         };

        // function to Add Expense and Income 
         var AddItem = function( Type ,  Description ,  Value  ){
             this.Type = Type;
             this.Description  = Description;
             this.Value = parseFloat(Value);
           this.Add = function(){
               
               // if expense was selected
                 if(this.Type== "exp"){
                     // creating Div to append 
                     var HTML = ' <div class="item clearfix" id="expense-%Id%"><div class="item__description">%Description%</div><div class="right clearfix"><div class="item__value">- %Value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                     var NewHTML = HTML.replace("%Id%" , ExpenseId);
                            NewHTML = NewHTML.replace("%Description%" , this.Description);
                            NewHTML = NewHTML.replace("%Value%" , this.Value);
                     var ExpenseDiv = document.querySelector("#ExpenseDiv");
                     ExpenseDiv.insertAdjacentHTML("beforeend" , NewHTML);
                     Data.AllExpenses[ExpenseId] = this.Value;    // Adding Key and Value           Key = ExpenseId     Value = Entered Value
                     ExpenseId++;
                     var sum = 0;
                     sum = CalculateSum("Expense" , sum );      // Calculating and Returning Sum by Function  
                     UpdateLists("Expense" , sum);                      // Updating the List in Front End 
                            
                 }
               
               // if income was selected
               else if(this.Type=="inc"){
                   HTML = '   <div class="item clearfix" id="income-%Id%"><div class="item__description">%Description%</div><div class="right clearfix"><div class="item__value">+%Value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>';
                      var NewHTML = HTML.replace("%Id%" , IncomeId);
                            NewHTML = NewHTML.replace("%Description%" , this.Description);
                            NewHTML = NewHTML.replace("%Value%" , this.Value);
                   var IncomeDiv = document.querySelector("#IncomeDiv");
                    IncomeDiv.insertAdjacentHTML("beforeend" , NewHTML);
                   Data.AllIncomes[IncomeId] =  this.Value;
                   IncomeId++;
                console.log(Data.AllIncomes);
                     var sum = 0;
                       sum = CalculateSum("Income" , sum );
                UpdateLists("Income" , sum);
                     
                 }
               }
             }
         
//   declaring variables
var Description = document.querySelector("#Description");
var Value = document.querySelector("#Value");
var Type = document.querySelector("#Type");
var Container = document.querySelector("#Container");


Container.onclick = function(event){
    // getting ID to delete the Div
 var ItemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if(ItemId){
     
        var    Id = ItemId.split("-");          // splitting the ID to get the delete ID
        var DeleteId = Id[1];
        var DeleteType = Id[0];
       if(DeleteType == "income"){
           Data.AllIncomes[DeleteId] = 0;           // Setting the value = 0
          var sum = 0;
                   sum = CalculateSum("Income" , sum );         // calculating sum
                UpdateLists("Income" , sum);                            // udpating the front end list
           
           document.getElementById(ItemId).remove();
           
       }
        else if(DeleteType == "expense"){
            Data.AllExpenses[DeleteId ] = 0;
          var sum = 0;
                   sum = CalculateSum("Expense" , sum );
              
                UpdateLists("Expense" , sum);
                 document.getElementById(ItemId).remove();
        }
        
    }
}

// function to check if the fields are empty or Not
document.querySelector("#AddButton").onclick = function(){
                    
     if(Description.value.trim() == "" || Description.value == isNaN(Description.value)){
           AddFocus(Description);
        }
        else{
                      if(Value.value.trim()==""){
                AddFocus(Value);
                          
            }
            else{
                var Add = new AddItem(Type.value , Description.value ,Value.value);
                            Add.Add();
                    ClearFields();
            }
            
        }
}

// if Enter is pressed check the values are empty or Not
    document.onkeypress = function(event){

        if(event.keyCode==13){
            if(Description.value.trim() == ""){
               AddFocus(Description);
            }
            else{
                          if(Value.value.trim()==""){
                    AddFocus(Value);
                }

                else{
                        var Add = new AddItem(Type.value , Description.value ,Value.value);
                                Add.Add();
                                ClearFields();
                }

            }
        }

        }
    
    
    //  functions for different purposes
    function CalculateSum(Type , sum){
        if(Type=="Expense"){
            for(var i=0; i < ExpenseId; i++){
                        sum = sum+ Data.AllExpenses[i];
                         
                    }
            return sum;
        }
        else if(Type=="Income"){
              for(var i=0; i < IncomeId; i++){
                        sum = sum+ Data.AllIncomes[i];
                    }
            return sum;
        }
    }

        function AddFocus(Input){
                        //    Input.style.background = "Red";
                            Input.style.border = "1px solid red";
                        Input.focus();
        }

        function ClearFields(){
            Description.value = "";
            Value.value = "";
            Description.focus();
        }


        function UpdateLists(Type , sum){
            if(Type=="Expense"){
                                    Data.TotalExpense = sum;
                                    document.querySelector("#AvaliableBudget").innerHTML = (Data.TotalIncome-Data.TotalExpense);
                                    document.querySelector("#TotalExpense").innerHTML ="-"+ sum;
            }
            else if(Type=="Income"){
                                Data.TotalIncome = sum;
                                var b = Data.TotalIncome-Data.TotalExpense;
                                 document.querySelector("#AvaliableBudget").innerHTML = b;
                                document.querySelector("#TotalIncome").innerHTML ="+"+ sum;
            }
        }

function DisplayMonth(){
     var MonthDiv = document.querySelector("#MonthDiv");
    var Now = new Date();
    var Year = Now.getFullYear();
    var Month = Now.getMonth();
    var MonthNames = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"];
    MonthDiv.innerHTML = MonthNames[Month] + "-"+Year;
}


 // setting background color and focus 

      Description.onkeypress = function(){
          if(Description.value.trim()!=""){
              Description.style.border = "0.5px solid green";
          }
      }
      
         Value.onkeypress = function(){
          if(Value.value.trim()!=""){
           Value.style.border = "0.5px solid green";
         
          }
      }
         
    

