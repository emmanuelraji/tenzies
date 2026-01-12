function Die({ value, isHeld, hold, id }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "",
  };
  return (
    <button
      style={styles}
      onClick={() => hold(id)}
      className="die-face"
      aria-pressed={isHeld}
      aria-label={`Die with value ${value}, 
            ${isHeld ? "held" : "not held"}`}
    >
      {value}
    </button>
  );
}

export default Die;
