import style from "./Loading.module.scss"

const Loading = () => {
  return (
    <div className={style.Page}>
      <div className={style.Loading}>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </div>
  )
}

export default Loading;
