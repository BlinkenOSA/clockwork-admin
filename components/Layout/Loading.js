import style from "./Loading.module.scss"

const Loading = () => {
  return (
    <div className={style.Page}>
      <div className={style.Loading}>
        <span>A</span>
        <span>M</span>
        <span>S</span>
      </div>
    </div>
  )
}

export default Loading;
