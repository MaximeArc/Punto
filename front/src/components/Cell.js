import "../css/App.css";

const Cell = ({key, onDrop, onDragOver}) => {
    return (
        <div
            className={`grid-cell`}
            key={key}
            onDrop={onDrop}
            onDragOver={onDragOver}>{this}
        </div>
    );
}
export default Cell