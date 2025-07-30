import './ShowlistItem.css';

interface ShowlistItemProps{
    colour?: string;
    artist?: string;
    supports?: string[];
    date?: string;
    link?: string;
}

const ShowlistItem: React.FC<ShowlistItemProps> = ({
    colour = '', 
    artist = 'To be confirmed', 
    supports = [], 
    date = '',
    link = '',
}) => {

    const background_colour = getBackgroundColor(colour);
    const parsedDate = parseDateIntoText(date);
    const parsedSupports = parseSupports(supports);
    const cleanedDate = cleanDate(date);

    return ( 
        <section className='item-box'  style={{ backgroundColor: background_colour}}>
            <div className='left-items'>
                <figure className='date-box' style={{ backgroundColor: colour }}>
                    <span className='day'>{parsedDate.day === 0 ? "TBC" : parsedDate.day}</span>
                    <span className='month'>{parsedDate.month}</span>
                </figure>
                <div className='text-section left-item'>
                    <h3>{artist.toUpperCase()}</h3>
                    <p>WITH {parsedSupports === "-" ? '-' : parsedSupports.toUpperCase()} | {cleanedDate}</p>
                </div>
            </div>
            <div className='button right-item'>
                <a href={link}>
                    <button id="edit-gig-button">Edit</button>
                </a>
            </div>
        </section>
    );
};

export default ShowlistItem;


/* HELPER FUNCTIONS */
function parseDateIntoText(date: string): { day: number; month: string } {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
  
    // Split the date into day and month regardless of separating character
    const datePart = date.split('T')[0];
    const numbers = datePart.split('-');
    if (!numbers || numbers.length < 3) {
        return { day: 0, month: "" }
    }
    if (!numbers || numbers.length < 3){ 
        return {day: 0, month: ""}
    }
    const dayInt = parseInt(numbers[2], 10);
    const monthString = months[parseInt(numbers[1], 10) - 1];
    return { day: dayInt, month: monthString };
}
  
function parseSupports(supports: string[]): string {
    if (!supports || supports.length === 0) {
        return "-";
    }
    return supports.join(", ");
}

// Method to always return the date in DD/MM/YYYY
function cleanDate(date: string): string {
    const datePart = date.split('T')[0];
    const numbers = datePart.split('-');
    if (!numbers || numbers.length < 3) {
      return "TO BE CONFIRMED"; // If invalid format
    }
  
    const [year, month, day] = numbers;
    const paddedDay = day.padStart(2, '0');
    const paddedMonth = month.padStart(2, '0');
  
    return `${paddedDay}/${paddedMonth}/${year}`;
  }

// Convert the main color to a background color with 0.2 opacity
function getBackgroundColor(color: string): string {
    if (color.startsWith('rgba')) {
        const values = color.match(/[\d.]+/g);
        if (values && values.length >= 3) {
            return `rgba(${values[0]}, ${values[1]}, ${values[2]}, 0.2)`; //Set background colour to colour but with 0.2 opacity
        }
    }
    return 'lightgrey'; //If colour provided in diff (invalid) format 
}
