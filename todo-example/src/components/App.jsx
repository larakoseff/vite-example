import { useEffect, useState } from "react";
import { v4 as createId } from "uuid";

const createLocal = (id) => {
    const get = () => {
        const response = window.localStorage.getItem(id)
        if (!response) return []
        return JSON.parse(response)
    }

    const set = (value) => {
        const string = JSON.stringify(value)
        window.localStorage.setItem(id, string)

    }

    return {
        get,
        set,
    }
}

const saved = createLocal("245e5865-3f0d-4e65-8b8b-44a50af76c5d")

const useTasks = () => {
  const [tasks, setTasks] = useState(saved.get());

  useEffect(() => {
saved.set(tasks)
  }, [tasks])

  const add = (title) => {
    const newTasks = [
        {
            id: createId(),
            title,
        },
            ...tasks,
        ];
    
        setTasks(newTasks);
  };

  const remove = (id) => {
    const newTasks = tasks.filter((item) => {
     return item.id !== id;
    });

    setTasks(newTasks);
  };

  

  return {
    tasks,
    add,
    remove,
    }
};

export const App = () => {
const { tasks, remove, add } = useTasks()

const formSubmit = (event) => {
    event.preventDefault();
    const { target } = event;
    const data = new FormData(target);
    const { title } = Object.fromEntries(data);
    add(title)
    target.reset();
  };


  return (
    <div className="red-button">
      <form onSubmit={formSubmit}>
        <label>
          <div>New Task</div>
          <input name="title"></input>
        </label>
        <button type="submit">SAVE</button>
      </form>

      <ul>
        {tasks.map(({ id, title }) => {
          return (
           <li key={id}>
            <span>{title}</span>
            <button onClick={() => remove(id)}>X</button>
            </li>
          )
        })}
      </ul>
    </div>
  );
};
