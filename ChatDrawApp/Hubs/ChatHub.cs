using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ChatDrawApp.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            // Simple validation or other logic
            if (string.IsNullOrWhiteSpace(user) || string.IsNullOrWhiteSpace(message))
            {
                throw new ArgumentException("User and message cannot be empty.");
            }

            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task SendDraw(DrawData data1, DrawData data2)
        {
            try
            {
                await Clients.Others.SendAsync("ReceiveDraw", data1, data2); // this invokes the ReceiveDraw action on all the connected clients.
                //Console.WriteLine("Drawn: {0}, {1}", data.X, data.Y);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error in SendDraw: {ex.Message}");
            }
        }
    }
    public class DrawData
    {
        public double X { get; set; }
        public double Y { get; set; }
    }

}