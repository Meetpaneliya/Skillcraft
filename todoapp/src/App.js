/* eslint-disable react/state-in-constructor */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */

import React, { Component, createRef } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import './App.css';

export default class Todo extends Component {
    state = {
        todoList: [],
        todoStatus: 'all',
    };

    inputRef = createRef();

    addTodo = (e) => {
        e.preventDefault();
        const todoText = this.inputRef.current;

        if (todoText) {
            this.setState(
                ({ todoList }) => ({
                    todoList: [
                        ...todoList,
                        { text: todoText.value, id: new Date().valueOf(), isDone: false },
                    ],
                }),
                () => {
                    this.inputRef.current.value = '';
                },
            );
        }
    };

    toggleComplete = (item) => {
        this.setState(({ todoList }) => {
            const index = todoList.findIndex((x) => x.id === item.id);
            return {
                todoList: [
                    ...todoList.slice(0, index),
                    { ...item, isDone: !item.isDone },
                    ...todoList.slice(index + 1),
                ],
            };
        });
    };

    deleteTodo = (item) => {
        this.setState(({ todoList }) => {
            const index = todoList.findIndex((x) => x.id === item.id);
            return {
                todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
            };
        });
    };

    changeTodoStatus = (state) => {
        this.setState({ todoStatus: state });
    };

    render() {
        const { todoList, todoStatus } = this.state;

        console.log('render');

        return (
            <div className="flex flex-col items-center h-screen bg-slate-900">
                <h1 className="text-5xl font-bold my-4 text-gray-600">Todo App</h1>
                <form className="flex" onSubmit={this.addTodo}>

                    <div className='flex gap-4 mt-5'>
                        <div>
                            <label htmlFor="todoText" className="sr-only">
                                Todo Text
                            </label>
                            <input
                                ref={this.inputRef}
                                type="text"
                                id="todoText"
                                placeholder='Write Todo...'
                                className="rounded-md mt-1 h-8 w-11/12 placeholder: pl-3 bg-slate-600 hover"
                            />
                        </div>

                        <button type="submit" className="btn rounded-md flex gap-1">
                            Add Todo

                            <div className='h-2 mt-1'>
                               <IoMdAdd />
                            </div>
                        </button>

                    </div>

                </form>

                <div className="w-[1250px] mx-auto justify-around my-4 flex-1">
                    {todoList
                        .filter((x) => {
                            switch (todoStatus) {
                                case 'completed':
                                    return x.isDone === true;

                                case 'pending':
                                    return x.isDone === false;

                                default:
                                    return true;
                            }
                        })
                        .map((item) => (
                            <div key={item.id} className="flex items-center m-4">
                                <div>
                                    <label htmlFor="isCompleted" className="sr-only">
                                        is Completed
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="isCompleted"
                                        id="isCompleted"
                                        checked={item.isDone}
                                        onChange={() => this.toggleComplete(item)}
                                        className="h-6 w-6 border mt-2 rounded-sm checked:bg-blue-600"
                                    />

                                </div>

                                <p className="flex-1 px-2 text-xl font-semibold text-slate-600">{item.text}</p>

                                <button
                                    type="button"
                                    className="btn flex gap-1"
                                    onClick={() => this.deleteTodo(item)}
                                >
                                    Delete     
                                    <div className='mt-1'>
                                       <RiDeleteBin6Line />
                                    </div>
                                </button>

                            </div>
                        ))}
                </div>
                <div className="w-full flex">
                    <button
                        type="button"
                        className="btn flex-1 rounded-none"
                        onClick={() => this.changeTodoStatus('all')}
                    >
                        All
                    </button>
                    <button
                        type="button"
                        className="btn flex-1 rounded-none"
                        onClick={() => this.changeTodoStatus('pending')}
                    >
                        Pending
                    </button>
                    <button
                        type="button"
                        className="btn flex-1 rounded-none"
                        onClick={() => this.changeTodoStatus('completed')}
                    >
                        Completed
                    </button>
                </div>
            </div>
        );
    }
}
