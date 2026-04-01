using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Softium.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddBlogFeatured : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFeatured",
                table: "BlogPosts",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFeatured",
                table: "BlogPosts");
        }
    }
}
