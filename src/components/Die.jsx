function Die({ value, isHeld, onClick }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : ""
  }
  return (
    <div style={styles} onClick={onClick} className="die-face">
      <h2 className="die-num">{value}</h2>
    </div>
  );
}

export default Die;