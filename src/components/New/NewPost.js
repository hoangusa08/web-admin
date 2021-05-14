import React from 'react'

export default function NewPost() {
    return (
        <div className="page-wrapper">
        <div className="page-breadcrumb">
            <div className="row">
                <div className="col-5 align-self-center">
                    <h4 className="page-title">New Post</h4>
                </div>
                <div className="col-7 align-self-center">
                    <div className="d-flex align-items-center justify-content-end">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">New Post</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <h4 className="card-title">New</h4>
                        <form className="form-horizontal m-t-30">
                            <div className="form-group">
                                <label>Name Post</label>
                                <input type="text" className="form-control" value=""/>
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <textarea className="form-control" rows="5"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Link Image</label>
                                <input type="text" className="form-control" value=""/>
                            </div>
                            <div className="form-group">
                                <button type="button" name="example-email" className="btn">Save </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
