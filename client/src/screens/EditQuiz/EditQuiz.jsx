import { useParams } from 'react-router-dom';

export default function EditQuiz() {

    const { user_id, quiz_id } = useParams();

    return (
        <>
            <h1>{user_id}</h1>
            <h1>{quiz_id}</h1>
        </>
    );
}