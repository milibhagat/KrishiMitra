// ... other imports
const YourListComponent = () => {
  const [language, setLanguage] = useState(localStorage.getItem('app_language') || 'hi');
  const [items, setItems] = useState([]); // All items
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (language === 'all') {
      setFilteredItems(items); // Show all
    } else {
      setFilteredItems(items.filter(item => item.language === language));
    }
  }, [language, items]);

  return (
    <>
      <LanguageSelector onLanguageChange={setLanguage} />
      {/* render filteredItems */}
    </>
  );
};
