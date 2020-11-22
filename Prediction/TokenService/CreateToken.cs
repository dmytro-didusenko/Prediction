using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prediction.TokenService
{
    public class CreateToken
    {
        /// <summary>
        /// Create new char by using random number and ASCII and check this char
        /// </summary>
        /// <returns>New char</returns>
        private char _createChar()
        {
            int newChar;
            while (true)
            {
                newChar = new Random().Next(1, 127);
                if ((newChar > 47 && newChar < 58) || (newChar > 64 && newChar < 91) || (newChar > 96 && newChar < 123))
                {
                    break;
                }
                else
                {
                    continue;
                }
            }
            
            return (char)newChar;
        }

        /// <summary>
        /// Create new token
        /// </summary>
        /// <returns>New token</returns>
        public string CreateNewToken()
        {
            string newToken = "";
            for (int i = 0; i <= AuthOptions.Length; i++)
            {
                newToken +=_createChar();
            }
            return newToken;
        }
    }
}
