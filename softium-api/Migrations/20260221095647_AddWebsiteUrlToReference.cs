using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Softium.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddWebsiteUrlToReference : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WebsiteUrl",
                table: "References",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WebsiteUrl",
                table: "References");
        }
    }
}
