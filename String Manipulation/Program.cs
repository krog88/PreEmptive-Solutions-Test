using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            // Keep going until user wants to quit
            while (1 == 1)
            {
                // Pring usage info
                Console.WriteLine("Enter some text (or type \"quit\"):");

                // Read user input
                string str = Console.ReadLine();

                // Quit if user types "quit"
                if (str.ToLower().Trim() == "quit") break;

                // Throw out any non-alpha characters
                str = Regex.Replace(str.ToLower(), "[^a-z]", "");

                // Group by character and counts, sort
                var charGroups = (from ch in str
                                  group ch by ch into g
                                  select new
                                  {
                                      theChar = g.Key,
                                      count = g.Count(),
                                  })
                                  .OrderByDescending(c => c.count)
                                  .ThenBy(c => c.theChar);

                // Output the groupings and counts
                foreach (var g in charGroups)
                {
                    Console.WriteLine(g.theChar + ": " + g.count);
                }

                // Add some space to make the next play easier to read
                Console.WriteLine();
            }

        }
    }
}
