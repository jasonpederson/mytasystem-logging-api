export default function asyncSleep(sleepTime) {
	return new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, sleepTime * 1000));
}
