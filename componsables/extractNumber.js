/**
 * Extract a number from a filename (e.g., 'file12.txt' -> 12)
 * @param {string} filename
 * @returns {number}
 */
const extractNumber = (filename) => {
    const match = filename.match(/\d+/);
    return match ? Number(match[0]) : 0;
};

export default extractNumber;