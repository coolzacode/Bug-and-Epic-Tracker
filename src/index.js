import './styles.css';
import Epic from './epic.js';
import Ticket from './ticket.js';

const authEpic = new Epic('Authentication System');

const bug1 = new Ticket('Fix login crash', '06-08-2026', 'critical');
const bug2 = new Ticket('Update border colors', '06-10-2026', 'low');

authEpic.tickets.push(bug1);
authEpic.tickets.push(bug2);

console.log(authEpic);