import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import toast, {Toaster} from 'react-hot-toast';


function App() {
  const [todoItem, setTodoItem] = useState({
    task: "",
    priority: "",
  });

  const [todoList, setTodoList] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");

  useEffect(() => {
  if (todoList.length == 0) return;

  localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

   useEffect(() => {
   const listFromLS = JSON.parse(localStorage.getItem("todoList") || "[]");
   setTodoList(listFromLS);
   }, []);

   const onDelete = (index) => {
    const listAfterDeletion = todoList.filter((_, i) =>  i != index);
    setTodoList(listAfterDeletion);
    toast.success("Task Deleted Successfully");
   };

    return (
  <div className="bg-amber-100 min-h-screen">
    <div className=" flex justify-around border-b-2 border-slate-400 pt-4">
      {["All", "High", "Medium", "Low"].map((tab, i) => {
        return (
          <span className={` block w-[100px] md:w-[250px] text-lg md:text-xl text-center rounded-tl-lg rounded-tr-lg py-1 cursor-pointer ${
            tab == selectedTab ? "bg-slate-400 text-white" : "bg-white"}`}
           key={i}
           onClick={() => setSelectedTab(tab)}
           >
            {tab}
          </span>
        );
      })}
    </div>
    <div className="h-[60vh] md:h-[80vh] overflow-scroll">
        {todoList.map((taskItem, index) => {
        const { task, priority} = taskItem;

        if (selectedTab != "All" && priority != selectedTab){
          return null;
        }

        return (
        <TodoCard 
        task={task} 
        priority={priority}
        key={index}
         index={index}
          onDelete={onDelete}
          />
        );
      })}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-slate-400 p-5 flex flex-col md:flex-row
      justify-center items-center gap-y-4 ">
       <input type="text"
       onChange={(e)=>{
        setTodoItem({
          ...todoItem,
          task: e.target.value
        });
       }}
       value={todoItem.task}
        className="bg-white text-xl w-full md:w-[400px] rounded-md p-2 focus:outline-none"
        placeholder="Enter Task"
        />

       <select className="text-xl bg-white p-2 rounded-md ml-0 md:ml-5 w-full md:w-[200px]"
       onChange={(e)=>{
        setTodoItem({
          ...todoItem,
          priority: e.target.value
        });
       }}
       value={todoItem.priority}>
         <option value={""}>Select  Priority</option>
        <option value={"High"}>High</option>
        <option value={"Medium"}>Medium</option>
        <option value={"Low"}>Low</option>
       </select>
       <button
        className="text-xl bg-yellow-500 px-10 py-2 rounded-md ml-10 mt-8 md:mt-0 w-[150px] cursor-pointer"
        onClick={()=> {
          if(!todoItem.task){
            toast.error('Please enter task');
            return;
          }

          if (!todoItem.priority){
            toast.error("Please select priority");
            return;
          }

          setTodoList([todoItem, ...todoList]);
          setTodoItem({
            task: "",
            priority: "",
          });
          toast.success('Task Added Successfully');
        }}
        >
        Add
        </button>
      </div>
      <Toaster/>
    </div>
  );
}

export default App