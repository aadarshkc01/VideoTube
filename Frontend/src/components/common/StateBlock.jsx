const StateBlock = ({ title, description, action }) => (
    <div className="state-block">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        {action && <div style={{ marginTop: "16px" }}>{action}</div>}
    </div>
);

export default StateBlock;
