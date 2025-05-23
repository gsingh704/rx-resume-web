const Keywords = ({ keywords, primaryColor }) => (
  <div className="flex flex-wrap mt-2">
    {keywords &&
      keywords.map((keyword, index) => (
        <span
          key={index}
          className="px-2 py-1 rounded-full mr-2 mb-1 text-xs sm:text-sm font-semibold"
          style={{
            backgroundColor: primaryColor + '20', 
            color: primaryColor,
            border: '1px solid ' + primaryColor,
          }}
        >
          {keyword}
        </span>
      ))}
  </div>
);

export default Keywords;