<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ArticleDetails.aspx.cs" Inherits="NewsSystem.WebForms.Account.ArticleDetails" Culture="en-CA" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <h2><%: this.SelectedArticle.Title %>   </h2>
    <span>
        Category: <%: this.SelectedArticle.Category.Name %>
    </span>
    <br />

    <asp:LoginView runat="server">
        <AnonymousTemplate>
        </AnonymousTemplate>
        <LoggedInTemplate>
            <asp:UpdatePanel runat="server">
                <ContentTemplate>
                    <div class="pull-left">
                        <div>
                            <asp:Button Text="+" Font-Bold="true" Font-Size="Large" runat="server" CommandName="VoteUp" ID="PositiveVoteBtn" CssClass="btn btn-default" OnClick="PositiveVoteBtn_Click" />
                        </div>
                        <div>
                            <h4>
                                <%: this.SelectedArticle.Vote %>
                            </h4>
                        </div>
                        <div>
                            <asp:Button Text="-" Font-Bold="true" Font-Size="Large" runat="server" CommandName="VoteDown" OnClick="NegativeVoteBtn_Click" CssClass="btn btn-default" ID="NegativeVoteBtn" />
                        </div>
                    </div>
                </ContentTemplate>
            </asp:UpdatePanel>

        </LoggedInTemplate>
    </asp:LoginView>
    <div class="like-control">
        <p>
            <%:this.SelectedArticle.Content %>
        </p>

        <p>
            Author: <%: this.SelectedArticle.User.UserName %>
            <span class="pull-right">Created: <%:this.SelectedArticle.DateCreated %></span>
        </p>
    </div>

</asp:Content>
