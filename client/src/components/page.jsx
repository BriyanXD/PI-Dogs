import React from "react";



class Page extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <button>{this.props.page}</button>
    )
}


}

export default Page;