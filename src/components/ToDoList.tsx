import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    Categories,
    categoryState,
    customCategoryState,
    toDoSelector,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function CustomCategory() {
    const [customCategories, setCustomCategories] =
        useRecoilState(customCategoryState);
    const [newCategory, setNewCategory] = useState("");
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(event.target.value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCustomCategories([...customCategories, newCategory]);
        setNewCategory("");
    };
    return (
        <div>
            <h2>Custom Categories</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={newCategory}
                    onChange={onInputChange}
                    placeholder="Add a category"
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const customCategories = useRecoilValue(customCategoryState);
    const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as Categories;
        if (customCategories.includes(value)) {
            setCategory(value);
        } else {
            setCategory(value as any);
        }
    };
    return (
        <div>
            <h1>To Do List</h1>
            <hr />
            <select value={category} onChange={onCategoryChange}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
                {customCategories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <CreateToDo />
            <CustomCategory />
            {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
            ))}
        </div>
    );
}

export default ToDoList;
