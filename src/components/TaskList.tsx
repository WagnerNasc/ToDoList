import { useState } from 'react';
import { ClipboardText } from 'phosphor-react';
import styles from './TaskList.module.css';

// interface TaskProps {
//     content: number;
//     onDeleteTask: (commentToDelete: number) => void;
// }

// { content, onDeleteTask }: TaskProps
export function TaskList() {
    const [ taskCount, setTaskCount ] = useState(0);

    function handleDeleteTask() {
        // onDeleteTask(content);
    }

    function handleLinkTask() {
        setTaskCount(taskCount + 1);
    }

    return(
        <div className={styles.taskList}>
                <header className={styles.taskHeader}>
                    <div className={styles.taskCount}>
                        Tarefas criadas <span>0</span>
                    </div>
                    <div className={styles.taskCompleted}>
                        Concluídas <span>0</span>
                    </div>
                </header>
                <div className={styles.taskContent}>
                    <ClipboardText size={70} />
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
        </div>
    )

}