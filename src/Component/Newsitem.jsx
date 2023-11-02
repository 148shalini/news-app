import React, { Component } from 'react'

export class Newsitem extends Component {

    render() {
let { title, description , imgUrl , newsUrl,author, date} = this.props;
                return (
            <div className='my-3'>
                <div className="card" >
                    <img src={!imgUrl?"https://framewishes.com/images/styles/indian-flag-photo-frame_b7a0.jpg" : imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title"> {title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author? "Unknown": author} on {date} </small></p>
                                                <a rel="nonreferrer" href={newsUrl}  target="_blank"className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
