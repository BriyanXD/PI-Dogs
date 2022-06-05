import React from 'react';
import { connect } from 'react-redux';
import { postForm, getDogs, cutForPaging} from '../action';
import Style from "../css/FormOfCreation.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faXmark, faTrashCan} from "@fortawesome/free-solid-svg-icons"
import { switchVisibleCreation } from '../action';


class FormOfCreation extends React.Component{
    constructor(){
        super()
        this.state = {
            name:"",
            image:"",
            weight_min:"",
            weight_max:"",
            height_min:"",
            height_max:"",
            life_span:"",
            temperaments:[],
            errorSend:"",

            messageError:{
/*              name:"",
                image:"",
                weight_min:"",
                weight_max:"",
                height_min:"",
                height_max:"",
                life_span:"",
                temperaments:"" */
            }
        }
    }

    //menejador para el cambio de error
    handlerError = async (name,msg) => {
        if(msg)await this.setState({messageError:{
            ...this.state.messageError,
            [name]:msg
        }})
        else await this.setState({messageError:{
            ...this.state.messageError,
            [name]:""
        }})
    }


    //copiamos el estado previo para evitar el warning
    handlerChange = async (e) =>{
        var expReg = /(https?:\/\/.*\.(?:png|jpg))/i
        if(e !== "submitBtn"){
            await  this.setState(prevState => ({
                ...prevState,
                [e.target.name]:e.target.value
         }))
         // Validaciones para el campo de name
         if(e.target.name === "name"){
            this.handlerError("temperaments")
            if(this.state.name.match(/\d/g))this.handlerError(e.target.name,"Nombre solo puede tener letras y espacios")
            else if(this.state.name.match(/[^\w\s]/g))this.handlerError(e.target.name,"Nombre no puede tener simbolos")
            else if(this.props.dogs.find(dog => dog.name === this.state.name))this.handlerError(e.target.name,`${this.state.name} Ya existe`)
            else this.handlerError(e.target.name)
         }
         // validacion para el campo image
         if(e.target.name === "image"){
            this.handlerError("temperaments")
             if(e.target.value !== "" && !expReg.test(this.state.image))this.handlerError(e.target.name,"Imagen debe ser una url de imagen")
             else this.handlerError(e.target.name)
         }
         if(e.target.name === "weight_min" || e.target.name === "weight_max" || e.target.name === "height_min" || e.target.name === "height_max" || e.target.name === "life_span"){
            this.handlerError("temperaments")
            if(this.state[e.target.name].match(/\W/g)) this.handlerError(e.target.name,`${e.target.placeholder} no puede tener simbolos solo numeros`)
            else if(this.state[e.target.name].match(/\D/g)) this.handlerError(e.target.name,`${e.target.placeholder} no puede tener letras solo numeros`)
            else if(this.state[e.target.name] <= 0) this.handlerError(e.target.name,`${e.target.placeholder} no puede ser menor o igual a cero`)
            else if(this.state[e.target.name] > 100) this.handlerError(e.target.name,`${e.target.placeholder} no puede ser mayor 100`)
            else this.handlerError(e.target.name)
                  // Validaciones para el campo de weight_min

            if(e.target.name === "weight_min" || e.target.name === "weight_max"){
                this.handlerError("temperaments")
                if((parseInt(this.state.weight_min) > parseInt(this.state.weight_max)))this.handlerError("weightError","Peso Minimo no puede ser mayor a Peso Maximo")
                else this.handlerError("weightError")
             }
            else if(e.target.name === "height_min" || e.target.name === "height_max"){
                this.handlerError("temperaments")
                if(parseInt(this.state.height_min) > parseInt(this.state.height_max))this.handlerError("heightError","Altura Minima no puede ser mayor a Altura Maxima")
                else this.handlerError("heightError")
             }
/*             else this.handlerError(e.target.name) */
         }
        }
        //verificacion antes de enviar el form
     /* if(e === "submitBtn"){
         console.log("verificando...")
        if(this.state.name !== "" && this.state.name.match(/\d/g))this.handlerError("Nombre solo puede tener letras y espacios")
        else if(this.state.name.match(/\W/g))this.handlerError("Nombre no puede tener simbolos")
        else if(!expReg.test(this.state.image) && this.state.image !== "")this.handlerError("Imagen debe ser una url de imagen")
        else if(parseInt(this.state.weight_min) > parseInt(this.state.weight_max))this.handlerError("Peso Minimo no puede ser mayor a Peso Maximo")
        else if(parseInt(this.state.height_min) > parseInt(this.state.height_max))this.handlerError("Altura Minima no puede ser mayor a Altura Maxima")

        const verificar = ["weight_min","weight_max","life_span","height_min","height_max"]

        for(let i of verificar){
        if(this.state[i].match(/\W/g)) this.handlerError(` no puede tener simbolos solo numeros`)
        else if(this.state[i].match(/\D/g)) this.handlerError(`no puede tener letras solo numeros`)
        else if(this.state[i] <= 0) this.handlerError(` no puede ser menor o igual a cero`)
        else if(this.state[i] > 100) this.handlerError(` no puede ser mayor 100`)
        }
        console.log("verificado completo...")
     } */
    }


    //mameja el agregar los temperamentos de manera dinamica
    handlerTempAdd = async (ev) => {
        if(!this.state.temperaments.includes(ev.target.value)){
            await this.setState({
                temperaments:[...this.state.temperaments,ev.target.value],
            })
            this.handlerError("temperaments")
        }else{
                this.handlerError("temperaments",`El temperamento ${ev.target.value} ya fue agregado antes`)
            }
        }

    //maneja el borrar los tempermanetos de manera dinamica
    handlerTempDelete = (ev) => {
            this.handlerError("temperaments")
            let filterResult = this.state.temperaments.filter(temp => temp !== ev.target.value)
        this.setState({
            temperaments:filterResult
        })
        }

    //mostrar los errors en la pantalla
    viewErrors = () => {
        for (let property in this.state.messageError){
            if(this.state.messageError[property]){
                return <span className={Style.error}>{this.state.messageError[property]}</span>
            }
        }
    }

    //maneja el envio del form
    handlerSubmitForm = async(e) => {
       /*  let submit = e.target.submitBtn.name
        this.handlerChange(submit) */
        const {name ,life_span ,weight_min ,weight_max , height_min , height_max , temperaments} = this.state.messageError
         if(name !== "" || life_span !== "" ||weight_min !== "" ||weight_max !== "" || height_min !== "" || height_max !== "" || temperaments !== "" ){
            this.handlerError("temperaments","Verfique que la informacion del formulario sera correcta")
            return
        }else if(this.state.name === "" || this.state.life_span === "" || this.state.weight_min === "" || this.state.weight_max === "" || this.state.height_min === "" || this.state.height_max === "" || this.state.temperaments.length < 1){
            this.handlerError("temperaments","Llene todos los campos para poder guardar")
            return
        }
        else{
            console.log("enviando")
            if(!this.state.image){
             const obj ={
                    name:this.state.name.toString(),
                    weight:this.state.weight_min + " - " + this.state.weight_max,
                    height:this.state.height_min + " - " + this.state.height_max,
                    life_span: this.state.life_span.toString(),
                    name_temp: this.state.temperaments
                }
                console.log(obj)
                await this.props.postForm(obj)
                await this.props.getDogs()
            }else{
                const obj = {
                    name:this.state.name.toString(),
                    image:this.state.image,
                    weight:this.state.weight_min + " - " + this.state.weight_max,
                    height:this.state.height_min + " - " + this.state.height_max,
                    life_span: this.state.life_span.toString(),
                    name_temp: this.state.temperaments
                }
                console.log(obj)
                await this.props.postForm(obj)
                await this.props.getDogs()
            }
        }
    }

    handlerClose = () => {
        this.props.switchVisibleCreation(false)
    }
    render(){
        return(
             this.props.stateCreation ?
             <div className={Style.contenedorGeneral}>
                 <div className={Style.contenedorInfo}>
                    <form onSubmit={e => {
                    e.preventDefault()
                    this.handlerSubmitForm(e)
                }} className={Style.form}>
                    <h1 className={Style.title} >FORM OF CREATION</h1>
                    <button className={Style.close} onClick={this.handlerClose}><FontAwesomeIcon  icon={faXmark}/></button>
                    {this.viewErrors()}
                    <br />
                    <input className={Style.input} type="text" name='name'  placeholder='Raza' value={this.state.name} onChange={(e)=>this.handlerChange(e)} />

                    <input className={Style.input} type="text" name='image' placeholder='Imagen' value={this.state.image} onChange={(e)=>this.handlerChange(e)}/>

                    <input className={Style.input} type="text" name='life_span' placeholder='Vida' value={this.state.life_span} onChange={(e)=>this.handlerChange(e)} required/>

                    <div className={Style.minmax}>
                    <input className={Style.input} type="text" name='weight_min' placeholder='Peso Minimo' value={this.state.weight_min} onChange={(e)=>this.handlerChange(e)} required/>

                    <span className={Style.minmaxtext} > - </span>

                    <input className={Style.input} type="text" name='weight_max' placeholder='Peso Maximo' value={this.state.weight_max} onChange={(e)=>this.handlerChange(e)} required/>
                    </div>

                    <div className={Style.minmax}>
                    <input className={Style.input} type="text" name='height_min' placeholder='Altura Minima' value={this.state.height_min} onChange={(e)=>this.handlerChange(e)} required/>
                    <span className={Style.minmaxtext} > - </span>
                    <input className={Style.input} type="text" name='height_max' placeholder='Altura Maxima'value={this.state.height_max} onChange={(e)=>this.handlerChange(e)} required/>
                    </div>

                    <select className={Style.select} name="temperaments" onChange={(e) => {this.handlerTempAdd(e)}}>
                    <option className={Style.option} >Temperamentos</option>
                        {this.props.temperaments_api.map(temp => {
                            return <option className={Style.option} value={temp.name} key={temp.id}>{temp.name}</option>
                        })}
                    </select>

                    <div className={Style.divtemperamentos}>
                        Temperamentos : {this.state.temperaments.length > 0 ?
                        this.state.temperaments.map(temp => {
                            return <button className={Style.tempsAdds} key={temp} value={temp} onClick={(e) => this.handlerTempDelete(e)}> {temp}  <FontAwesomeIcon icon={faTrashCan}/> </button>
                        }
                        ): <></>
                    }
                    </div>

                    <input className={Style.send} type="submit" value="Guardar" name='submitBtn'/>

                </form>
                 </div>
             </div> : <></>
        )
    }
}


const mapSateToProps = (state) => {
    return{
        temperaments_api: state.temperaments,
        stateCreation: state.stateCreation,
        dogs: state.dogs
    }

}
export default connect(mapSateToProps,{postForm, switchVisibleCreation, getDogs})(FormOfCreation)

