
const handleSelectAll = ({setIsCheckAll,setIsCheck,List,isCheckAll}) => {
  setIsCheckAll(!isCheckAll);
  setIsCheck(List.map((li) => li.id)); //mapping the list passed from the component in this function and check to tr
  if (isCheckAll) {
    setIsCheck([]);
  }
};

const handleClick = ({e, data, setIsCheck, isCheck}) => {
  const { checked } = e.target;
  setIsCheck([...isCheck, data.id]);
  if (!checked) {//condition to check if the state is true or false
    const unChecked = isCheck.filter((x) => x !== data.id); //if its false so the check will remove
    setIsCheck(unChecked);
  }
};

export { handleSelectAll, handleClick };
