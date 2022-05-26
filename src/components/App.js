import Autocomplete from "./Autocomplete";
import './styles.css'
import React, {useEffect, useState} from "react";
import {loadPosts, selectAllPosts, edit} from './redux/postsSlice'
import {useDispatch, useSelector} from "react-redux";
import ModalWindow from "./ModalWindow";

function App() {

    const dispatch = useDispatch();
    const {posts} = useSelector(selectAllPosts)

    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch]);

    useEffect(() => {
        const updatedPosts = posts.map((item) => ({
            ...item,
            isSelected: false
        }));
        setPostsList(updatedPosts)
    }, [posts])

    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const [item, setItem] = useState({})
    const [postsList, setPostsList] = useState([])


    const onEditPost = (list) => {
        setEditTitle(list.title);
        setEditBody(list.body);
        setItem(list)
    }

    const onSave = (id) => {
        const updatedList = postsList.map(el => el.id === id ? {
            ...el,
            userId: 1,
            title: editTitle,
            body: editBody,
            isSelected: true
        } : el);
        dispatch(edit(updatedList));
        setPostsList(updatedList);

    }

    const onResultsChange = (searchResult) => {
        const searchList = postsList.map(el => el.title === searchResult ? {...el, isSelected: true} : el)
        setPostsList(searchList)
    }

    const onEditTitle = (e) => {
        setEditTitle(e.target.value)
    }

    const onEditBody = (e) => {
        setEditBody(e.target.value)
    }

    return (
        <div>
            <h2>Start your search here:</h2>
            <Autocomplete
                suggestion={postsList.map(el => el.title)}
                onResultsChange={onResultsChange}
            />
            <ModalWindow
                editTitle={editTitle}
                onEditTitle={onEditTitle}
                editBody={editBody}
                onEditBody={onEditBody}
                onSave={onSave}
                item={item}
            />
            <div>
                <ol>
                    {postsList.map(list => list.isSelected && <li key={list.id}>{list.title}
                        <button
                            className="btn btn-sm btn-outline-dark"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            data-whatever="@fat"
                            onClick={() => onEditPost(list)}
                        >
                            Edit post
                        </button>

                    </li>)}
                </ol>
            </div>

        </div>
    );
};


export default App;
