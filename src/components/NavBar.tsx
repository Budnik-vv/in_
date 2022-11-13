import React from 'react'
import './index.css';
import GradeSharpIcon from '@mui/icons-material/GradeSharp';

export const Navbar = () => {
    return (
        <nav>
            <section>
                <div className="navContent">
                    <div className="navLinks">
                        <div className="headerNews"><GradeSharpIcon></GradeSharpIcon> 
                            Star News</div> 
                    </div>  
                </div>
            </section>
        </nav>
    )
}
