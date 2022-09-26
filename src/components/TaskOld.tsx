import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';
import { PlusCircle, ClipboardText, Trash } from 'phosphor-react';
import styles from './Task.module.css';

export function Task() {
    const [ tasks, setTasks ] = useState<string[]>([]);
    const [ newTask, setNewTask ] = useState('');
    const [ taskCount, setTaskCount ] = useState(0);
    const [ isChecked, setIsChecked ] = useState(false);
    const [ countChecked, setCountCheck ] = useState(0);

    function handleCreateList(e: FormEvent) {
        e.preventDefault();

        setTasks([...tasks, newTask]);
        setTaskCount(taskCount + 1);

        setNewTask('');
    }

    function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>) {
        e.target.setCustomValidity('');
        setNewTask(e.target.value);
    }

    function handleNewCommentInvalid(e: InvalidEvent<HTMLInputElement>) {
        e.target.setCustomValidity('A tarefa não pode estar vazia!');
    }

    function toggleChange(index : number, e : ChangeEvent<HTMLInputElement>) {
        console.log(index);
        setIsChecked(e.target.checked);
        if (e.target.checked === true)
            setCountCheck(countChecked + 1);
        else {
            setCountCheck(countChecked - 1); /* Ver uma forma de subtrair quando deletar o index */
        }
    }

    function deleteList(taskToDelete : number) {
        const taskWithoutDelete = tasks.filter((task, index) => {
            return index !== taskToDelete;
        })

        if (taskCount >= 1) {
            setTaskCount(taskCount - 1);
        }

        setTasks(taskWithoutDelete);
    }

    const isNewTaskEmpty = newTask.length === 0;

    return(
        <div className={styles.wrapper}>
            <form onSubmit={handleCreateList} className={styles.listForm}>
                <input className={styles.inputList}
                        name="task"
                        value= {newTask}
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
                            <span>{taskCount}</span>
                    </div>
                    <div className={styles.taskCompleted}>
                        <strong>Concluídas</strong>
                        {taskCount === 0 ? 
                        (
                            <span>0</span>
                        ) :
                        (
                            <span>{countChecked} de {taskCount}</span>
                        )}
                    </div>
                </header>
                {taskCount === 0 ?
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
                                                <input type="checkbox" onChange={(e) => toggleChange(index, e)} />
                                                <p>{item}</p>
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