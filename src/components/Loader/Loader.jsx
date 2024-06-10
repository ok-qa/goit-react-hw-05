import { Watch } from 'react-loader-spinner'
import css from './Loader.module.css'

const Loader = ()=>{
    return(
        <div className={css.loader}>
        <Watch
            visible={true}
            height="80"
            width="80"
            radius="48"
            color="#753f07"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
  /> 
        </div>
    )
}

export default Loader;