using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;



namespace TrackerIO.Data.Migrations
{
    /// <inheritdoc />
    [DbContext(typeof(TrackerDataContext))]
    [Migration("20230922194803_Remove_FileContent")]
    public partial class Remove_FileContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileContent",
                table: "Files");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "FileContent",
                table: "Files",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}
