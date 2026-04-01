using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Softium.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddLayoutToProject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Layout",
                table: "Projects",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Layout",
                table: "Projects");
        }
    }
}
