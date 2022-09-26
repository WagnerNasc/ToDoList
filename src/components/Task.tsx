import { useState, useEffect, FormEvent, ChangeEvent, InvalidEvent } from 'react';
import { PlusCircle, ClipboardText, Trash } from 'phosphor-react';
import { v4 as uuid } from 'uuid';
import styles from './Task.module.css';

interface Task {
    id: string,
    name: string,
    isChecked: boolean
}

export function Task() {
    const [ tasks, setTasks ] = useState<Task[]>([]);
    const [ newTask, setNewTask ] = useState('');
    const [ countChecked, setCountChecked ] = useState(0);
    
   function counterChecked() {
        setCountChecked(tasks.filter(item => item.isChecked === true).length);
   }

    function handleCreateList(e: FormEvent) {
        e.preventDefault();

        setTasks([...tasks, {   
                                id: uuid(),
                                name: newTask,
                                isChecked: false
                            }
        ]);
        setNewTask('');
    }

    function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>) {
        e.target.setCustomValidity('');
        setNewTask(e.target.value);
    }

    function handleNewCommentInvalid(e: InvalidEvent<HTMLInputElement>) {
        e.target.setCustomValidity('A tarefa não pode estar vazia!');
    }

    function toggleChange(item : string, e : ChangeEvent<HTMLInputElement>) {
        tasks.map(task => {
            if (task.id === item) {
                task.isChecked = e.target.checked;
            }  
        });
        counterChecked();
    }

    function deleteList(taskToDelete : number) {
        const taskWithoutDelete = tasks.filter((task, index) => {
            return index !== taskToDelete;
        });
        setTasks(taskWithoutDelete);
        counterChecked();
    }

    const isNewTaskEmpty = newTask.length === 0;

    return(
        <div className={styles.wrapper}>
            <form onSubmit={handleCreateList} className={styles.listForm}>
                <input className={styles.inputList}
                        name="task"
                        value={newTask}
                        placeholder= "Adicione uma nova tarefa"
                        onChange= {handleNewTaskChange}
                        onInvalid= {handleNewCommentInvalid}
                        required
                />
                <footer className={styles.btnSubmit}>
                    <button type="submit" disabled={isNewTaskEmpty}>
                        Criar <PlusCircle size={24} />
                    </button>
                </footer>

            </form>
            <div className={styles.taskList}>
                <header className={styles.taskHeader}>
                    <div className={styles.taskCount}>
                        <strong>Tarefas criadas</strong>
                            <span>{tasks.length}</span>
                    </div>
                    <div className={styles.taskCompleted}>
                        <strong>Concluídas</strong>
                        {tasks.length === 0 ? 
                        (
                            <span>0</span>
                        ) :
                        (
                            <span>{countChecked} de {tasks.length}</span>
                        )}
                    </div>
                </header>
                {tasks.length === 0 ?
                    (
                        <div className={styles.taskBoxNull}>
                            <ClipboardText size={70} />
                            <strong>Você ainda não tem tarefas cadastradas</strong>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </div>
                    )
                    :
                    (
                        tasks.map((item, index) => {
                            return (
                                <div className={styles.taskBox} key={index}>
                                    <div className={styles.taskContent}>
                                        <div className={styles.taskCheck}>
                                            <label>
                                                <input type="checkbox" key={index} onChange={(e) => toggleChange(item.id, e)}/>
                                                <p>{item.name}</p>
                                                <span className={styles.check}></span>

                                            </label>
                                        </div>
                                        <div className={styles.taskTrash} onClick={(e) => deleteList(index)}>
                                            <Trash size={16} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}