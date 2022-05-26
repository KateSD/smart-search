import React from 'react'

const ModalWindow = (
    {editTitle, onEditTitle, editBody, onEditBody, onSave, item}
) => {
    return (
        <div className="modal" className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit post</h5>
                        <button type="button" className="btn btn-sm btn-secondary" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label">Post title:</label>
                                <input type="text" className="form-control" value={editTitle}
                                       onChange={onEditTitle}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label">Post body:</label>
                                <input type="text" className="form-control" value={editBody}
                                       onChange={onEditBody}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" data-dismiss="modal">Close
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-dark" data-dismiss="modal"
                                onClick={() => onSave(item.id, editTitle, editBody)}>Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;
