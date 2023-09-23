using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrackerIO.Data.Migrations
{
    /// <inheritdoc />
    [DbContext(typeof(TrackerDataContext))]
    [Migration("20230922202210_Add_Upload_time")]
    public partial class Add_Upload_time : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "UploadTime",
                table: "Files",
                type: "timestamp with time zone",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UploadTime",
                table: "Files");
        }
    }
}
